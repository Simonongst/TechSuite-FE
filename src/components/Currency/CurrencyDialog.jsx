import { useState, useEffect } from 'react';
import { createCurrency, updateCurrency } from '../../services/currency';
function CurrencyDialog({
  openDialog,
  setOpenDialog,
  selectedCurrency,
  setSelectedCurrency,
  fetchCurrencies,
}) {
  /* ========== useStates and useEffect ========== */
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
        await updateCurrency(newCurrency, selectedCurrency._id);
      } else {
        await createCurrency(newCurrency);
      }
      await fetchCurrencies();
      setOpenDialog(false);
      setSelectedCurrency(null);
      setErrMsg('');
    } catch (err) {
      setErrMsg(err.message || 'Error saving currency');
    }
  }
  return <div>CurrencyDialog</div>;
}

export default CurrencyDialog;
