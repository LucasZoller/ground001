export type WishItem = {
  itemAddedOn: string
  productId: string
  productTitle: string
  productPrice: string
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}

// Each user can have up to 5 lists.
// List has a name.
// How can we tell the primary wishlist?

// CREATE TABLE wishlist (
//   id SERIAL PRIMARY KEY,         -- Unique identifier for each wishlist
//   ref_user_id INT NOT NULL REFERENCES users(id),  -- Links to the users table
//   list_data JSONB NOT NULL,      -- JSONB storing up to 20 items
//   list_name VARCHAR(100) DEFAULT 'My Wishlist',  -- Optional: allow users to name lists
//   serial_number INT NOT null,
//   is_primary BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMP DEFAULT NOW()
// );

// Create "partial unique index" constraints on "is_primary = TRUE" for each ref_user_id.
// CREATE UNIQUE INDEX idx_primary_wishlist
// ON wishlist (ref_user_id)
// WHERE is_primary = TRUE;

// the shape of list_data
// [
//   {"productId": "abcd0001", "comment": "Initial comment", "added_at": "2024-11-20T12:00:00Z"},
//   {"productId": "abcd0002", "comment": "Another comment", "added_at": "2024-11-21T12:00:00Z"},...x20 max
// ]

export const obj = [
  {
    itemAddedOn: "January 11, 2020",
    productId: "aknm001",
    productTitle: "Emo, Angst, and Sex",
    productPrice: "19.22",
    thumbSetObject: {
      avif: ["https://i.postimg.cc/G3YRSdx0/AKNM-Thumb-Creator-mobile2-900x1000-320.avif", "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"],
      jpeg: ["https://i.postimg.cc/TY66zFtK/AKNM-Thumb-Creator-mobile2-900x1000-320.jpg", "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"]
    }
  },
  {
    itemAddedOn: "December 29, 2019",
    productId: "aknm002",
    productTitle: "太ももムチムチ歌舞伎町メンヘラ系女子の寂しくてロンリーゆきずりファック。",
    productPrice: "22.22",
    thumbSetObject: {
      avif: ["https://i.postimg.cc/x17PBytd/aknm024-thumb-m-320.avif", "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"],
      jpeg: ["https://i.postimg.cc/nLBqg8Xd/aknm024-thumb-m-320.jpg", "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"]
    }
  },
  {
    itemAddedOn: "November 29, 2025",
    productId: "aknm003",
    productTitle: "White-Collar Crime in the Shadow Economy: Lack of Detection, Investigation and Conviction Compared to Social Security Fraud",
    productPrice: "19.58",
    thumbSetObject: {
      avif: ["https://i.postimg.cc/x17PBytd/aknm024-thumb-m-320.avif", "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"],
      jpeg: ["https://i.postimg.cc/nLBqg8Xd/aknm024-thumb-m-320.jpg", "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"]
    }
  },
  {
    itemAddedOn: "January 11, 2020",
    productId: "aknm004",
    productTitle: "【ムチムチ爆乳50代】いっぱいイカせすぎ♡アッ乳首されるとすぐイッちゃうの…あイヤン、イッちゃう！あぁイクーー！！キモチぃのぉーーー",
    productPrice: "19.22",
    thumbSetObject: {
      avif: ["https://i.postimg.cc/G3YRSdx0/AKNM-Thumb-Creator-mobile2-900x1000-320.avif", "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"],
      jpeg: ["https://i.postimg.cc/TY66zFtK/AKNM-Thumb-Creator-mobile2-900x1000-320.jpg", "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"]
    }
  },
  {
    itemAddedOn: "December 29, 2019",
    productId: "aknm005",
    productTitle: "太ももムチムチ歌舞伎町メンヘラ系女子の寂しくてロンリーゆきずりファック。",
    productPrice: "22.22",
    thumbSetObject: {
      avif: ["https://i.postimg.cc/x17PBytd/aknm024-thumb-m-320.avif", "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"],
      jpeg: ["https://i.postimg.cc/nLBqg8Xd/aknm024-thumb-m-320.jpg", "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"]
    }
  },
  {
    itemAddedOn: "November 29, 2025",
    productId: "aknm006",
    productTitle: "White-Collar Crime in the Shadow Economy: Lack of Detection, Investigation and Conviction Compared to Social Security Fraud",
    productPrice: "19.58",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "January 11, 2020",
    productId: "aknm007",
    productTitle: "Emo, Angst, and Sex",
    productPrice: "19.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "December 29, 2019",
    productId: "aknm008",
    productTitle: "太ももムチムチ歌舞伎町メンヘラ系女子の寂しくてロンリーゆきずりファック。",
    productPrice: "22.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "November 29, 2025",
    productId: "aknm009",
    productTitle: "White-Collar Crime in the Shadow Economy: Lack of Detection, Investigation and Conviction Compared to Social Security Fraud",
    productPrice: "19.58",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "January 11, 2020",
    productId: "aknm010",
    productTitle: "Emo, Angst, and Sex",
    productPrice: "19.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "December 29, 2019",
    productId: "aknm011",
    productTitle: "太ももムチムチ歌舞伎町メンヘラ系女子の寂しくてロンリーゆきずりファック。",
    productPrice: "22.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "November 29, 2025",
    productId: "aknm012",
    productTitle: "White-Collar Crime in the Shadow Economy: Lack of Detection, Investigation and Conviction Compared to Social Security Fraud",
    productPrice: "19.58",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "January 11, 2020",
    productId: "aknm013",
    productTitle: "Emo, Angst, and Sex",
    productPrice: "19.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "December 29, 2019",
    productId: "aknm014",
    productTitle: "太ももムチムチ歌舞伎町メンヘラ系女子の寂しくてロンリーゆきずりファック。",
    productPrice: "22.22",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  },
  {
    itemAddedOn: "November 29, 2025",
    productId: "aknm015",
    productTitle: "White-Collar Crime in the Shadow Economy: Lack of Detection, Investigation and Conviction Compared to Social Security Fraud",
    productPrice: "19.58",
    thumbSetObject: {
      avif: [
        "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
        "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
        "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
      ],
      jpeg: [
        "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
        "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
        "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
      ]
    }
  }
]
