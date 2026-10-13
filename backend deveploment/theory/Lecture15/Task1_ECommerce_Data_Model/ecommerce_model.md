E-COMMERCE CONCEPTUAL DATA MODEL

┌─────────────────────┐
│      CUSTOMER       │
├─────────────────────┤
│ Customer ID         │
│ Name                │
│ Email               │
└──────────┬──────────┘
           │
       has / places
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────────┐  ┌─────────────────┐
│    CART     │  │      ORDER      │
├─────────────┤  ├─────────────────┤
│ Cart ID     │  │ Order ID        │
│ Customer ID │  │ Order Date      │
│ Created Date│  │ Total Amount    │
└──────┬──────┘  └────────┬────────┘
       │                   │
       │ contains          │ contains
       └─────────┬─────────┘
                 ▼
        ┌─────────────────┐
        │     PRODUCT     │
        ├─────────────────┤
        │ Product ID      │
        │ Product Name    │
        │ Price           │
        └─────────────────┘