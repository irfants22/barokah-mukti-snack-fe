export const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatWeight = (weight) => {
  if (!weight) return "";

  const [unit, value] = weight.split("_");

  if (unit === "KG") return `${value}kg`;
  if (unit === "GRAM") return `${value}gram`;

  return weight;
};

export const calculateTotalPrice = (data) => {
  return data.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getShippingCost = (city) => {
  return city === "Diluar Jabodetabek" ? 6000 : 3000;
};
