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
    if (!equipmentItem) return 0;

    const equipmentCurrency = currencyData.find(
      (currency) =>
        currency._id === equipmentItem.currency._id ||
        currency.code === equipmentItem.currency.code
    );
    const equipmentRate = equipmentCurrency ? equipmentCurrency.rateToBase : 1;

    if (equipmentCurrency?.code === form.currency) {
      return equipmentItem.unitCost;
    }

    const costInBase = equipmentItem.unitCost / equipmentRate;
    return costInBase * rate;
  };

  // Calculate counts
  const totalDevices =
    Number(form.desktop) + Number(form.laptop) + Number(form.deskPhone);
  const switchCount24 =
    form.switchPorts === '24' ? Math.ceil(totalDevices / 24) : 0;
  const switchCount48 =
    form.switchPorts === '48' ? Math.ceil(totalDevices / 48) : 0;
  const ethernetCount = totalDevices;

  let switchItems = [];

  if (form.switchPorts === '24') {
    const switchCount24 = Math.ceil(totalDevices / 24);
    switchItems.push({
      label: 'Network Switches - 24 Ports',
      qty: switchCount24,
      unitCost: getCost('Network Switch - 24 Ports'),
      totalCost: switchCount24 * getCost('Network Switch - 24 Ports'),
    });
  }

  if (form.switchPorts === '48') {
    const switchCount48 = Math.ceil(totalDevices / 48);
    switchItems.push({
      label: 'Network Switches - 48 Ports',
      qty: switchCount48,
      unitCost: getCost('Network Switch - 48 Ports'),
      totalCost: switchCount48 * getCost('Network Switch - 48 Ports'),
    });
  }

  // Item Arrays
  const items = [
    {
      label: 'Desktops',
      qty: Number(form.desktop),
      unitCost: getCost('Desktop'),
      totalCost: Number(form.desktop) * getCost('Desktop'),
    },
    {
      label: 'Laptops',
      qty: Number(form.laptop),
      unitCost: getCost('Laptop'),
      totalCost: Number(form.laptop) * getCost('Laptop'),
    },
    {
      label: 'Monitors',
      qty: Number(form.monitor),
      unitCost: getCost('Monitor'),
      totalCost: Number(form.monitor) * getCost('Monitor'),
    },
    {
      label: 'Desk Phones',
      qty: Number(form.deskPhone),
      unitCost: getCost('Desk Phone'),
      totalCost: Number(form.deskPhone) * getCost('Desk Phone'),
    },
    ...switchItems,
    {
      label: 'Ethernet Cables',
      qty: ethernetCount,
      unitCost: getCost('Ethernet Cable'),
      totalCost: ethernetCount * getCost('Ethernet Cable'),
    },
  ];

  // Totals
  const total = items.reduce((sum, item) => sum + item.totalCost, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return { items, total, totalItems };
}

export default calculateSummary;
