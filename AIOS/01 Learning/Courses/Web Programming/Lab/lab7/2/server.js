const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const foods = [
    {
        id: 'padthai',
        name: 'Pad Thai',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
        ingredients: ['Rice noodles', 'Eggs', 'Tofu', 'Peanuts', 'Bean sprouts', 'Tamarind paste'],
        nutrition: { calories: 400, protein: 12, carbohydrates: 60, fat: 14 },
        availability: ['Thailand', 'Global']
    },
    {
        id: 'caesarsalad',
        name: 'Caesar Salad',
        image: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-500x500.jpg',
        ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
        nutrition: { calories: 300, protein: 10, carbohydrates: 15, fat: 25 },
        availability: ['Mexico', 'Global']
    },
    {
        id: 'sushiplatter',
        name: 'Sushi Platter',
        image: 'https://onolicioushawaii.com/wp-content/uploads/2021/11/sushi-platter-1.jpg',
        ingredients: ['Sushi rice', 'Nori', 'Raw fish', 'Vegetables', 'Soy sauce'],
        nutrition: { calories: 350, protein: 20, carbohydrates: 45, fat: 5 },
        availability: ['Japan', 'Global']
    },
    {
        id: 'tacosalpastor',
        name: 'Tacos al Pastor',
        image: 'https://iamafoodblog.com/wp-content/uploads/2021/05/al-pastor-3507w.jpg',
        ingredients: ['Corn tortillas', 'Marinated pork', 'Pineapple', 'Onions', 'Cilantro'],
        nutrition: { calories: 200, protein: 12, carbohydrates: 20, fat: 10 },
        availability: ['Mexico', 'Global']
    },
    {
        id: 'butterchicken',
        name: 'Butter Chicken',
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg',
        ingredients: ['Chicken', 'Yogurt', 'Tomato paste', 'Cream', 'Spices'],
        nutrition: { calories: 450, protein: 25, carbohydrates: 15, fat: 35 },
        availability: ['India', 'Global']
    },
    {
        id: 'falafelwrap',
        name: 'Falafel Wrap',
        image: 'https://www.datocms-assets.com/138735/1728115398-howtomakeveganfalafel-h1.jpg',
        ingredients: ['Falafel 4 pieces', 'Pita Bread 1 piece', 'Tahini Sauce 30 ml'],
        nutrition: { calories: 350, protein: 15, carbohydrates: 40, fat: 12 },
        availability: ['Middle East', 'Global']
    }
];

app.get('/api/foods', (req, res) => {
    res.json(foods);
});

app.get('/api/foods/:id', (req, res) => {
    const food = foods.find(f => f.id === req.params.id);
    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ error: 'Food not found' });
    }
});

app.get('/food/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
