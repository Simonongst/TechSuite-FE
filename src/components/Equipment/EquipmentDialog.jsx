import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createEquipment, updateEquipment } from '../../services/equipment';
import Currency from '../../pages/Currency';

function EquipmentDialog({
  openDialog,
  setOpenDialog,
  selectedEquipment,
  setSelectedEquipment,
  fetchEquipment,
}) {
  /* ========== useStates and useEffect ========== */
  const [isEditMode, setIsEditMode] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newEquipment, setNewEquipment] = useState({
    type: '',
    unitCost: '',
    currency: 'USD',
    isActive: true,
  });
  useEffect(() => {
    if (openDialog && selectedEquipment) {
      setIsEditMode(true);
      setNewEquipment({
        type: selectedEquipment.type || '',
        unitCost: selectedEquipment.unitCost || '',
        currency: selectedEquipment.currency || 'USD',
        isActive: selectedEquipment.isActive ?? true,
      });
      setErrMsg('');
    } else if (openDialog && !selectedEquipment) {
      setIsEditMode(false);
      setNewEquipment({
        type: '',
        unitCost: '',
        currency: 'USD',
        isActive: true,
      });
      setErrMsg('');
    }
  }, [openDialog, selectedEquipment]);
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
    try {
      if (isEditMode) {
        await updateEquipment(newEquipment, selectedEquipment._id);
      } else {
        await createEquipment(newEquipment);
      }
      await fetchEquipment();
      setOpenDialog(false);
      setSelectedEquipment(null);
      setErrMsg('');
    } catch (err) {
      setErrMsg(err.message || 'Error saving equipment');
    }
  }

  return <div>EquipmentDialog</div>;
}

export default EquipmentDialog;
