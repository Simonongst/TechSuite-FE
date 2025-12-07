import { useState } from "react"

function EquipmentPlanning({
    currencyData,
}) {

    const [form, setForm] = useState({
        currency: 'USD',
        employees: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

  return (
    <div className="space-y-2 text-gray-700">
        <h2 className="font-semibold">Equipment Planning Inputs</h2>
        <p className="text-sm">Enter your organization's requirements to calculate equipment needs</p>

        <div>
            <label className="text-sm font-medium">
                <h3 className="mt-6 font-semibold">$ Currency:</h3>
                <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    {currencyData.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.label} ({currency.rateToBase})
                        </option>
                    ))}
                </select>
            </label>

            <label className="text-sm font-medium">
                <h3 className="mt-6 font-semibold">Number of Employees:</h3>
                <input
                    type="number"
                    name="employees"
                    value={form.employees}
                    onChange={handleChange}
                    className="mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                >
                </input>
            </label>            
        </div>
    </div>
  )
}

export default EquipmentPlanning