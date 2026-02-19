import * as v from 'valibot';
import React, {useMemo} from 'react';
import {toast} from 'react-toastify';
import {Controller, useForm} from 'react-hook-form';

import Button from '@mui/material/Button';
import {AccountStatus} from '@/domain/Account';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import {valibotResolver} from '@hookform/resolvers/valibot';
import useMoveMoneySubmit from '@views/accounts/hooks/useMoveMoneySubmit';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import FlexxAutocomplete from '@components/FlexxCustomTextInputs/FlexxAutocomplete';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';

const MoveMoneySchema = v.object({
  sourceAccountId: v.string([v.minLength(1, 'Source account is required.')]),
  destinationAccountId: v.string([
    v.minLength(1, 'Destination account is required.'),
  ]),
  amount: v.string([
    v.minLength(1, 'Amount is required.'),
    v.custom(
      (val: string) => Number(val) > 0,
      'Amount must be greater than 0.',
    ),
  ]),
  confirmed: v.boolean([
    v.custom((val: boolean) => val === true, 'You must confirm the transfer.'),
  ]),
});

type MoveMoneyFormValues = v.Output<typeof MoveMoneySchema>;

interface MoveMoneyFormProps {
  sourceAccountId?: string;
  onSuccess?: () => void;
}

const MoveMoneyForm: React.FC<MoveMoneyFormProps> = ({
  sourceAccountId,
  onSuccess,
}) => {
  const {data: accounts = []} = useFetchAccounts();

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<MoveMoneyFormValues>({
    resolver: valibotResolver(MoveMoneySchema),
    mode: 'onBlur',
    defaultValues: {
      sourceAccountId: sourceAccountId || '',
      destinationAccountId: '',
      amount: '',
      confirmed: false,
    },
  });

  const {mutate: moveMoney} = useMoveMoneySubmit(() => {
    toast.success('Money moved successfully!');
    onSuccess?.();
  });

  const onSubmit = (data: MoveMoneyFormValues) => {
    moveMoney({
      source_account_id: data.sourceAccountId,
      destination_account_id: data.destinationAccountId,
      amount: parseFloat(data.amount),
      merchant: 'Internal Transfer',
    });
  };

  const accountOptions = useMemo(
    () =>
      accounts
        .filter(acc => acc.status === AccountStatus.OPEN)
        .map(acc => ({
          id: acc.account_id,
          value: acc.account_id,
          label: `${acc.name} – ${acc.bank_name}`,
        })),
    [accounts],
  );

  return (
    <Stack flexGrow={1} gap={'1rem'}>
      <Typography variant={'h3'}>Move Money</Typography>

      <Controller
        name='sourceAccountId'
        control={control}
        render={({field, fieldState}) => (
          <FlexxAutocomplete
            options={accountOptions}
            error={fieldState.error?.message}
            label='Source Account'
            placeholder='Select source account'
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            ref={field.ref}
            variant='outlined'
            size='small'
            fullWidth
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
            disabled={!!sourceAccountId}
            onOptionChange={(_, option) => field.onChange(option?.value ?? '')}
          />
        )}
      />

      <Controller
        name='destinationAccountId'
        control={control}
        render={({field, fieldState}) => (
          <FlexxAutocomplete
            options={accountOptions}
            error={fieldState.error?.message}
            label='Destination Account'
            placeholder='Select destination account'
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            ref={field.ref}
            variant='outlined'
            size='small'
            fullWidth
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
            onOptionChange={(_, option) => field.onChange(option?.value ?? '')}
          />
        )}
      />

      <Controller
        name='amount'
        control={control}
        render={({field, fieldState}) => (
          <Box onBlur={field.onBlur}>
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              label='Amount'
              placeholder='Enter amount'
              fullWidth
              number={true}
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
              currency={true}
            />
          </Box>
        )}
      />

      <Controller
        name='confirmed'
        control={control}
        render={({field, fieldState}) => (
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                />
              }
              label='I confirm this transfer'
            />
            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </Stack>
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
          Move Money
        </Button>
      </div>
    </Stack>
  );
};

export default MoveMoneyForm;
