'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ROUTES, VALIDATION } from '@/lib/constants';
import { validatePassword } from '@/lib/utils';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  username: z
    .string()
    .min(VALIDATION.username.minLength, `Username must be at least ${VALIDATION.username.minLength} characters`)
    .max(VALIDATION.username.maxLength, `Username must be less than ${VALIDATION.username.maxLength} characters`)
    .regex(VALIDATION.username.pattern, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(VALIDATION.password.minLength, `Password must be at least ${VALIDATION.password.minLength} characters`)
    .max(VALIDATION.password.maxLength, `Password must be less than ${VALIDATION.password.maxLength} characters`),
  confirmPassword: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: false, errors: [] });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedPassword = watch('password');

  // Check password strength when password changes
  React.useEffect(() => {
    if (watchedPassword) {
      setPasswordStrength(validatePassword(watchedPassword));
    }
  }, [watchedPassword]);

  const onSubmit = async (data: RegisterFormData) => {
    clearError();
    await registerUser(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Join our community to help find lost items
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name (Optional)"
                  type="text"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.firstName?.message}
                  {...register('firstName')}
                  placeholder="First name"
                />
                <Input
                  label="Last Name (Optional)"
                  type="text"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.lastName?.message}
                  {...register('lastName')}
                  placeholder="Last name"
                />
              </div>

              {/* Username Field */}
              <Input
                label="Username"
                type="text"
                leftIcon={<User className="h-4 w-4" />}
                error={errors.username?.message}
                fullWidth
                {...register('username')}
                placeholder="Choose a username"
              />

              {/* Email Field */}
              <Input
                label="Email Address"
                type="email"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                fullWidth
                {...register('email')}
                placeholder="Enter your email"
              />

              {/* Password Field */}
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-secondary-500 hover:text-secondary-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                fullWidth
                {...register('password')}
                placeholder="Create a password"
              />

              {/* Password Strength Indicator */}
              {watchedPassword && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-secondary-700">
                    Password Requirements:
                  </p>
                  <div className="space-y-1">
                    {[
                      { condition: watchedPassword.length >= 8, text: 'At least 8 characters' },
                      { condition: /[A-Z]/.test(watchedPassword), text: 'One uppercase letter' },
                      { condition: /[a-z]/.test(watchedPassword), text: 'One lowercase letter' },
                      { condition: /\d/.test(watchedPassword), text: 'One number' },
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {requirement.condition ? (
                          <CheckCircle className="h-4 w-4 text-success-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-secondary-400" />
                        )}
                        <span
                          className={`text-sm ${
                            requirement.condition
                              ? 'text-success-600'
                              : 'text-secondary-500'
                          }`}
                        >
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Password Field */}
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-secondary-500 hover:text-secondary-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                error={errors.confirmPassword?.message}
                fullWidth
                {...register('confirmPassword')}
                placeholder="Confirm your password"
              />

              {/* Error Message */}
              {error && (
                <div className="bg-error-50 border border-error-200 rounded-md p-4">
                  <p className="text-sm text-error-600">{error}</p>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-secondary-600">
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                size="lg"
                disabled={!passwordStrength.isValid}
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Handle Google registration
                  }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Handle Facebook registration
                  }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-secondary-600">
                  Already have an account?{' '}
                  <Link
                    href={ROUTES.login}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
