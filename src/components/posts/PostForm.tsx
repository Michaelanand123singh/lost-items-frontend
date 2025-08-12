'use client';

import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Upload, 
  X, 
  MapPin, 
  Tag, 
  DollarSign,
  Phone,
  Mail,
  User,
  Image as ImageIcon
} from 'lucide-react';
import { POST_CATEGORIES, POST_STATUSES, VALIDATION } from '@/lib/constants';
import { CreatePostData, UpdatePostData, Post } from '@/types/post';
import { formatFileSize, isValidImageType } from '@/lib/utils';

const postSchema = z.object({
  title: z
    .string()
    .min(VALIDATION.title.minLength, `Title must be at least ${VALIDATION.title.minLength} characters`)
    .max(VALIDATION.title.maxLength, `Title must be less than ${VALIDATION.title.maxLength} characters`),
  description: z
    .string()
    .min(VALIDATION.description.minLength, `Description must be at least ${VALIDATION.description.minLength} characters`)
    .max(VALIDATION.description.maxLength, `Description must be less than ${VALIDATION.description.maxLength} characters`),
  category: z.enum(['electronics', 'jewelry', 'clothing', 'documents', 'pets', 'vehicles', 'books', 'sports', 'other']),
  status: z.enum(['lost', 'found']),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  reward: z.number().optional(),
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email('Please enter a valid email').optional(),
    preferredContact: z.enum(['phone', 'email', 'both']),
  }),
  tags: z.array(z.string()).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSuccess, onCancel }) => {
  const { createPost, updatePost, isLoading } = usePosts();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post ? {
      title: post.title,
      description: post.description,
      category: post.category,
      status: post.status,
      location: post.location,
      reward: post.reward,
      contactInfo: post.contactInfo,
      tags: post.tags,
    } : {
      status: 'lost',
      contactInfo: {
        preferredContact: 'email',
      },
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => isValidImageType(file));
    setUploadedImages(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData: CreatePostData = {
        ...data,
        images: uploadedImages,
        tags,
      };

      if (post) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }

      onSuccess?.();
      if (!post) {
        reset();
        setUploadedImages([]);
        setImagePreviewUrls([]);
        setTags([]);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {post ? 'Edit Post' : 'Create New Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title"
              error={errors.title?.message}
              fullWidth
              {...register('title')}
              placeholder="Brief description of the lost item"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                {...register('category')}
                className="w-full h-10 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(POST_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-error-600">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Provide detailed description of the item, when and where it was lost/found, and any identifying features..."
            />
            {errors.description && (
              <p className="text-sm text-error-600 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Status and Reward */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                {...register('status')}
                className="w-full h-10 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(POST_STATUSES).slice(0, 2).map(([key, status]) => (
                  <option key={key} value={key}>
                    {status.icon} {status.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Reward (Optional)"
              type="number"
              leftIcon={<DollarSign className="h-4 w-4" />}
              error={errors.reward?.message}
              {...register('reward', { valueAsNumber: true })}
              placeholder="0"
            />
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Address"
                error={errors.location?.address?.message}
                fullWidth
                {...register('location.address')}
                placeholder="Street address"
              />
              <Input
                label="City"
                error={errors.location?.city?.message}
                fullWidth
                {...register('location.city')}
                placeholder="City"
              />
              <Input
                label="State/Province"
                error={errors.location?.state?.message}
                fullWidth
                {...register('location.state')}
                placeholder="State or province"
              />
              <Input
                label="Country"
                error={errors.location?.country?.message}
                fullWidth
                {...register('location.country')}
                placeholder="Country"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <User className="h-5 w-5 mr-2" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone (Optional)"
                type="tel"
                leftIcon={<Phone className="h-4 w-4" />}
                error={errors.contactInfo?.phone?.message}
                {...register('contactInfo.phone')}
                placeholder="Phone number"
              />
              <Input
                label="Email (Optional)"
                type="email"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.contactInfo?.email?.message}
                {...register('contactInfo.email')}
                placeholder="Email address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Contact Method</label>
              <select
                {...register('contactInfo.preferredContact')}
                className="w-full h-10 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag and press Enter"
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Images
            </h3>
            
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-secondary-300 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-secondary-400" />
              <p className="mt-2 text-sm text-secondary-600">
                {isDragActive
                  ? 'Drop the images here...'
                  : 'Drag & drop images here, or click to select files'
                }
              </p>
              <p className="text-xs text-secondary-500 mt-1">
                Maximum 5 images, 5MB each (JPEG, PNG, WebP)
              </p>
            </div>

            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-xs text-secondary-500 mt-1">
                      {formatFileSize(uploadedImages[index]?.size || 0)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" loading={isLoading}>
              {post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
