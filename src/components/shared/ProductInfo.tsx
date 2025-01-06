const ProductInfo = ({ row }: { row: CartItem }) => {
  return (
    <div className="flex gap-x-2">
      <img
        src={row.avatar}
        alt={row.productName}
        className="w-16 h-16 object-cover rounded-md hidden lg:block"
        loading="lazy"
      />
      <div className="space-y-2">
        <p className="text-sm font-normal  lg:max-w-full max-w-[100px] truncate">
          {row.productName}
        </p>
        <p className="text-muted-foreground">
          {row.productItem.productSize.value} - {row.color}
        </p>
      </div>
    </div>
  );
};
export default ProductInfo;
