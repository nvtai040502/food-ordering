# Build an Food Ordering Website: Next.js 14, Prisma, MongoDB, Shadcn/ui, Clerk 

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/nvtai040502/food-ordering
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=""

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### Setup Prisma

Add MongoDB Database

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```