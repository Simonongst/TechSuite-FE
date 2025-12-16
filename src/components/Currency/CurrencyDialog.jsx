import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createCurrency, updateCurrency } from '../../services/currency';
import { useAuth } from '../../context/AuthContext';

function CurrencyDialog({
  openDialog,
  setOpenDialog,
  selectedCurrency,
  setSelectedCurrency,
  fetchCurrencies,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newCurrency, setNewCurrency] = useState({
    code: '',
    label: '',
    rateToBase: '',
    isActive: true,
  });

  useEffect(() => {
    if (openDialog && selectedCurrency) {
      setIsEditMode(true);
      setNewCurrency({
        code: selectedCurrency.code || '',
        label: selectedCurrency.label || '',
        rateToBase: selectedCurrency.rateToBase || '',
        isActive: selectedCurrency.isActive ?? true,
      });
      setErrMsg('');
    } else if (openDialog && !selectedCurrency) {
      setIsEditMode(false);
      setNewCurrency({
        code: '',
        label: '',
        rateToBase: '',
        isActive: true,
      });
      setErrMsg('');
    }
  }, [openDialog, selectedCurrency]);
  /* ========== Functions ========== */
  function resetValues() {
    setNewCurrency({
      code: '',
      label: '',
      rateToBase: '',
      isActive: true,
    });
    setErrMsg('');
    setIsEditMode(false);
    setSelectedCurrency(null);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCurrency(newCurrency, selectedCurrency._id, tokens.access);
      } else {
        await createCurrency(newCurrency, tokens.access);
      }
      await fetchCurrencies();
      setOpenDialog(false);
      setSelectedCurrency(null);
      setErrMsg('');
    } catch (err) {
      setErrMsg(err.message || 'Error saving currency');
    }
  }
  return (
    <Dialog.Root
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
        if (open && !selectedCurrency) {
          setNewCurrency({
            code: '',
            label: '',
            rateToBase: '',
            isActive: true,
          });
          setErrMsg('');
          setIsEditMode(false);
        }
        if (!open) resetValues();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/20 z-50' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50'>
          <Dialog.Title className='text-2xl font-semibold mb-4'>
            {isEditMode ? 'Edit Currency' : 'New Currency'}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
              aria-label='Close'
              onClick={resetValues}
            >
              <IoCloseCircleOutline className='w-6 h-6' />
            </button>
          </Dialog.Close>
          {errMsg && <div className='mb-3 text-red-500 text-sm'>{errMsg}</div>}
          <form onSubmit={handleSubmit}>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='currency-code'
              >
                Code
              </label>
              <input
                id='currency-code'
                type='text'
                value={newCurrency.code}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, code: e.target.value })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                disabled={isEditMode || newCurrency.code === 'USD'}
                required
              />
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='currency-label'
              >
                Label
              </label>
              <input
                id='currency-label'
                type='text'
                value={newCurrency.label}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, label: e.target.value })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                required
              />
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='currency-rate'
              >
                Rate to Base
              </label>
              <input
                id='currency-rate'
                type='number'
                value={newCurrency.rateToBase}
                onChange={(e) =>
                  setNewCurrency({
                    ...newCurrency,
                    rateToBase: parseFloat(e.target.value),
                  })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                required
              />
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='currency-active'
              >
                Active
              </label>
              <select
                id='currency-active'
                value={newCurrency.isActive ? 'true' : 'false'}
                onChange={(e) =>
                  setNewCurrency({
                    ...newCurrency,
                    isActive: e.target.value === 'true',
                  })
                }
                className={`mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                ${
                  newCurrency.code === 'USD'
                    ? 'appearance-none bg-gray-100 cursor-not-allowed'
                    : ''
                }`}
                disabled={newCurrency.code === 'USD'}
                required
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
            </fieldset>
            <div className='flex justify-end mt-6 gap-2'>
              <button
                type='submit'
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors'
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default CurrencyDialog;
