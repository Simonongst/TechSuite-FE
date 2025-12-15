import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createEquipment, updateEquipment } from '../../services/equipment';

function EquipmentDialog({
  openDialog,
  setOpenDialog,
  selectedEquipment,
  setSelectedEquipment,
  fetchEquipment,
  currencyData,
  fetchCurrencies,
}) {
  /* ========== useStates and useEffect ========== */
  const [isEditMode, setIsEditMode] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newEquipment, setNewEquipment] = useState({
    type: '',
    unitCost: '',
    currency: '',
    isActive: true,
  });

  useEffect(() => {
    if (openDialog && selectedEquipment) {
      setIsEditMode(true);
      setNewEquipment({
        type: selectedEquipment.type || '',
        unitCost: selectedEquipment.unitCost || '',
        currency: selectedEquipment.currency?._id || '',
        isActive: selectedEquipment.isActive ?? true,
      });
      setErrMsg('');
    } else if (openDialog && !selectedEquipment) {
      setIsEditMode(false);
      setNewEquipment({
        type: '',
        unitCost: '',
        currency: '',
        isActive: true,
      });
      setErrMsg('');
    }
  }, [openDialog, selectedEquipment]);

  useEffect(() => {
    if (openDialog) {
      fetchCurrencies();
    }
  }, [openDialog]);

  /* ========== Arrays ========== */
  const equipmentType = [
    'Desktop',
    'Laptop',
    'Monitor',
    'Desk Phone',
    'Network Switch - 24 Ports',
    'Network Switch - 48 Ports',
    'Ethernet Cable',
  ];

  /* ========== Functions ========== */
  function resetValues() {
    setNewEquipment({
      type: '',
      unitCost: '',
      currency: 'USD',
      isActive: true,
    });
    setErrMsg('');
    setIsEditMode(false);
    setSelectedEquipment(null);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrMsg('');
    try {
      let result;
      if (isEditMode) {
        result = await updateEquipment(newEquipment, selectedEquipment._id);
      } else {
        result = await createEquipment(newEquipment);
      }

      if (result && result.success === false) {
        setErrMsg(result.message || result.error);
        return;
      }

      await fetchEquipment();
      setOpenDialog(false);
      setSelectedEquipment(null);
      setErrMsg('');
    } catch (err) {
      setErrMsg(err.message || 'Error saving equipment');
    }
  }

  return (
    <Dialog.Root
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
        if (open && !selectedEquipment) {
          setNewEquipment({
            type: '',
            unitCost: '',
            currency: 'USD',
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
            {isEditMode ? 'Edit Equipment' : 'New Equipment'}
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
          <form onSubmit={handleSubmit}>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='equipment-type'
              >
                Equipment Type
              </label>
              <select
                id='equipment-type'
                type='text'
                value={newEquipment.type}
                onChange={(e) => {
                  setNewEquipment({ ...newEquipment, type: e.target.value });
                  setErrMsg('');
                }}
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                required
              >
                <option disabled value=''>Select Equipment</option>
                {equipmentType.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errMsg && <p className='ml-4 text-sm text-red-500'>{errMsg}</p>}
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='equipment-unitCost'
              >
                Unit Cost
              </label>
              <input
                id='equipment-unitCost'
                type='number'
                min='0'
                step='0.01'
                value={newEquipment.unitCost}
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    unitCost: Number(e.target.value),
                  })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                required
              />
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='equipment-currency'
              >
                Currency
              </label>
              <select
                id='equipment-currency'
                value={newEquipment.currency}
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    currency: e.target.value,
                  })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
                required
              >
                <option disabled value=''>Select Currency</option>
                {currencyData.map((currency) => (
                  <option key={currency._id} value={currency._id}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='equipment-active'
              >
                Active
              </label>
              <select
                id='equipment-active'
                value={newEquipment.isActive ? 'true' : 'false'}
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    isActive: e.target.value === 'true',
                  })
                }
                className='mt-1 block w-full border rounded-md px-3 py-2 text-sm'
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

export default EquipmentDialog;
