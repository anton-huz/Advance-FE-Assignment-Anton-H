import React from 'react';
import * as v from 'valibot';
import {toast} from 'react-toastify';
import {Controller, useForm} from 'react-hook-form';

import Button from '@mui/material/Button';
import {Box, Stack, Typography} from '@mui/material';
import {valibotResolver} from '@hookform/resolvers/valibot';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import useCreateAccountSubmit from '@views/accounts/hooks/useCreateAccountSubmit';

const CreateAccountSchema = v.object({
  accountName: v.string([v.minLength(1, 'This field is required.')]),
  bankName: v.string([v.minLength(1, 'This field is required.')]),
  routingNumber: v.string([v.minLength(1, 'This field is required.')]),
  accountNumber: v.string([v.minLength(1, 'This field is required.')]),
});

type CreateAccountFormValues = v.Output<typeof CreateAccountSchema>;

interface CreateAccountFormProps {
  onSuccess?: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({onSuccess}) => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<CreateAccountFormValues>({
    resolver: valibotResolver(CreateAccountSchema),
    mode: 'onBlur',
    defaultValues: {
      accountName: '',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
    },
  });

  const {mutate: createAccount} = useCreateAccountSubmit(() => {
    toast.success('Account created successfully!');
    onSuccess?.();
  });

  const onSubmit = (data: CreateAccountFormValues) => {
    createAccount({
      name: data.accountName,
      bank_name: data.bankName,
      routing_number: data.routingNumber,
      account_number: data.accountNumber,
      bank_icon: '',
      status: 'open',
      balance: 0,
    });
  };

  return (
    <Stack flexGrow={1} gap={'1rem'}>
      <Typography variant={'h3'}>Create Account</Typography>

      <Controller
        name='accountName'
        control={control}
        render={({field, fieldState}) => (
          <Box onBlur={field.onBlur}>
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              label='Account Name'
              placeholder='Enter account name'
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          </Box>
        )}
      />

      <Controller
        name='bankName'
        control={control}
        render={({field, fieldState}) => (
          <Box onBlur={field.onBlur}>
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              label='Bank Name'
              placeholder='Enter bank name'
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          </Box>
        )}
      />

      <Controller
        name='routingNumber'
        control={control}
        render={({field, fieldState}) => (
          <Box onBlur={field.onBlur}>
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              label='Routing Number'
              placeholder='Enter routing number'
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
              routingNumber={true}
            />
          </Box>
        )}
      />

      <Controller
        name='accountNumber'
        control={control}
        render={({field, fieldState}) => (
          <Box onBlur={field.onBlur}>
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              label='Account Number'
              placeholder='Enter account number'
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
              number={true}
            />
          </Box>
        )}
      />

      <div className='flex items-center plb-2'>
        <Button
          fullWidth
          variant='contained'
          size='medium'
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Add Account
        </Button>
      </div>
    </Stack>
  );
};

export default CreateAccountForm;
