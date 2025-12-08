import { deleteCurrency } from '../../services/currency';
function CurrencyTable({
  selectedRow,
  setSelectedRow,
  setOpenDialog,
  setSelectedCurrency,
  currencyData,
  fetchCurrencies,
}) {
  if (!currencyData || currencyData.length === 0) {
    return <div className='p-4 text-slate-500'>No Currencies available.</div>;
  }
  async function handleDelete(currency) {
    if (!currency?._id) {
      console.error('No currency selected for deletion');
      return;
    }
    try {
      await deleteCurrency(currency._id);
      await fetchCurrencies();
    } catch (err) {
      console.error('Error deleting currency:', err);
    }
  }
  return (
    <div>CurrencyTable</div>
  )
}

export default CurrencyTable