function calculateSummary(form, equipmentData, currencyData) {
  // Find selected currency and rate
  const selectedCurrency = currencyData.find(
    (currency) => currency.code === form.currency
  );
  const rate = selectedCurrency ? selectedCurrency.rateToBase : 1;

  // Get unit cost from equipmentData
  const getCost = (type) => {
    const equipmentItem = equipmentData.find(
      (equipment) => equipment.type === type && equipment.isActive
    );
    return equipmentItem ? equipmentItem.unitCost : 0;
  };

  // Calculate counts
  const totalDevices =
    Number(form.desktop) + Number(form.laptop) + Number(form.deskPhone);
  const switchCount = form.switchPorts
    ? Math.ceil(totalDevices / Number(form.switchPorts))
    : 0;
  const ethernetCount = totalDevices;

  // Item Arrays
  const items = [
    {
      label: 'Desktops',
      qty: Number(form.desktop),
      unitCost: getCost('Desktop') * rate,
      totalCost: Number(form.desktop) * getCost('Desktop') * rate,
    },
    {
      label: 'Laptops',
      qty: Number(form.laptop),
      unitCost: getCost('Laptop') * rate,
      totalCost: Number(form.laptop) * getCost('Laptop') * rate,
    },
    {
      label: 'Monitors',
      qty: Number(form.monitor),
      unitCost: getCost('Monitor') * rate,
      totalCost: Number(form.monitor) * getCost('Monitor') * rate,
    },
    {
      label: 'Desk Phones',
      qty: Number(form.deskPhone),
      unitCost: getCost('Desk Phone') * rate,
      totalCost: Number(form.deskPhone) * getCost('Desk Phone') * rate,
    },
    {
      label: 'Network Switches',
      qty: switchCount,
      unitCost: getCost('Network Switch') * rate,
      totalCost: switchCount * getCost('Network Switch') * rate,
    },
    {
      label: 'Ethernet Cables',
      qty: ethernetCount,
      unitCost: getCost('Ethernet Cable') * rate,
      totalCost: ethernetCount * getCost('Ethernet Cable') * rate,
    },    
  ];

  // Totals
  const total = items.reduce((sum, item) => sum + item.totalCost, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return { items, total, totalItems };
}

export default calculateSummary;
