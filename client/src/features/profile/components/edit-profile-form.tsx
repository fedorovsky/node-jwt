import { useForm } from 'react-hook-form';
import { Button } from '@/shared/styled-system/components/ui/button';
import { Input } from '@/shared/styled-system/components/ui/input';
import { Label } from '@/shared/styled-system/components/ui/label';
import { getQueryErrorMessage } from '@/shared/lib/get-query-error-message';
import type { User } from '@/shared/types/user';
import { useUpdateMyProfileMutation } from '../api/profile-api';
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN,
} from '../constants';

interface EditProfileFormProps {
  profile: User;
  onSaved?: (profile: User) => void;
  onCancel?: () => void;
}

interface EditProfileFormValues {
  username: string;
}

export const EditProfileForm = ({
  profile,
  onSaved,
  onCancel,
}: EditProfileFormProps) => {
  const [updateProfile, { isLoading, error }] = useUpdateMyProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditProfileFormValues>({
    defaultValues: { username: profile.username },
  });

  const onSubmit = handleSubmit(async values => {
    const result = await updateProfile({ username: values.username.trim() });
    if ('data' in result && result.data) onSaved?.(result.data);
  });

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-sm">
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
        >
          {getQueryErrorMessage(error, 'Failed to update profile.')}
        </p>
      )}

      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profile.email} disabled />
        <p className="mt-1 text-sm text-gray-500">Email cannot be changed.</p>
      </div>

      <div className="mb-4">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          autoComplete="username"
          {...register('username', {
            required: 'Username is required',
            setValueAs: (value: string) => value.trim(),
            minLength: {
              value: USERNAME_MIN_LENGTH,
              message: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
            },
            maxLength: {
              value: USERNAME_MAX_LENGTH,
              message: `Username must be at most ${USERNAME_MAX_LENGTH} characters`,
            },
            pattern: {
              value: USERNAME_PATTERN,
              message:
                'Only letters, digits, dots, underscores and hyphens are allowed',
            },
          })}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading || !isDirty}>
          {isLoading ? 'Saving…' : 'Save'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
