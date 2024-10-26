export type OrderObject = {
  purchasedDate: string
  totalPrice: string
  orderId: string
  items: OrderedItem[]
}

export type OrderedItem = {
  productId: string
  productTitle: string
  productPrice: string
  expiryDate: string
  streamingPath: string
  downloadPath: string
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}
export const obj = [
  {
    purchasedDate: "October 4, 2024",
    totalPrice: "91.50",
    orderId: "112-8845614-3671408",
    items: [
      {
        productId: "aknm024",
        productTitle: "Emo, Angst, and Sexxxx",
        productPrice: "20.58",
        expiryDate: "May 5, 2025",
        streamingPath: "/some-streaming-path",
        downloadPath: "/come-download-path",
        thumbSetObject: {
          avif: [
            "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
            "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
            "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif",
          ],
          jpeg: [
            "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
            "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
            "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg",
          ],
        },
      },
      {
        productId: "aknm024dummy",
        productTitle:
          "Emo, Angst, and Sex22222, Fuck fucker, fucking, fuckest.",
        productPrice: "22.22",
        expiryDate: "December 31, 2025",
        streamingPath: "/some-streaming-path",
        downloadPath: "/come-download-path",
        thumbSetObject: {
          avif: [
            "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
            "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
            "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif",
          ],
          jpeg: [
            "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
            "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
            "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg",
          ],
        },
      },
    ],
  },
]
