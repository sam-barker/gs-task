interface ProductDataItem {
  productSku: string
  productId: string
}

export type ProductData = ProductDataItem[]

export const productData: ProductData = [
  {
    productSku: 'gymshark-speed-t-shirt-black-aw23',
    productId: '39654522814667',
  },
  {
    productSku: 'gymshark-speed-t-shirt-artificial-teal-ss24',
    productId: '39654820577483',
  },
  {
    productSku: 'gymshark-speed-t-shirt-titanium-blue-ss24',
    productId: '39654815924427',
  },
]
