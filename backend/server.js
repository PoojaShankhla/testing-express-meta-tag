const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const news = [
  {
    id: "delicious-food-recipes",
    title: "Delicious Food Recipes",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Explore a variety of recipes to cook delicious meals at home.",
  },
  {
    id: "adorable-animals",
    title: "Adorable Animals Around the World",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOG5TM1EovYcHRS_Uoi7lufuMrQ3slzfmoLg&s",
    description: "Discover some of the most adorable animals from around the globe.",
  },
];

// ✅ Serve Dynamic Meta Tags for Social Media
app.get("/news/:newsId", (req, res) => {
  const article = news.find((item) => item.id === req.params.newsId);

  if (!article) {
    return res.status(404).send("Article Not Found");
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:title" content="${article.title}" />
        <meta property="og:description" content="${article.description}" />
        <meta property="og:image" content="${article.image}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://yourdomain.com/news/${article.id}" />
        <title>${article.title}</title>
    </head>
    <body>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <img src="${article.image}" width="500px" alt="${article.title}" />
        <script>
          window.location = "/news-react/${article.id}";
        </script>
    </body>
    </html>
  `;

  res.send(htmlContent);
});

// Start the Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
