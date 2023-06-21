export default function Head() {
  return (
    <>
      <title>რეცეპტორი</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Discover a wide range of delicious recipes at Receptor. From appetizers to desserts, we have you covered. Start cooking today!"
      />
      <meta
        name="keywords"
        content="recipes, cooking, food, cuisine, meals, dishes, ingredients"
      />
      <meta name="author" content="Giorgi Lomsianidze" />

      {/*  Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Receptor - Your Destination for Recipes"
      />
      <meta
        property="og:description"
        content="Discover a wide range of delicious recipes at Receptor. From appetizers to desserts, we have you covered. Start cooking today!"
      />
      <meta
        property="og:image"
        content="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80"
      />
      {/* <meta property="og:url" content="https://example.com/" /> */}

      <link rel="icon" href="/favicon.ico" sizes="any" />
    </>
  );
}
