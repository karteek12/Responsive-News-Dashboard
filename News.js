import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    "https://newsapi.org/v2/top-headlines",
                    {
                        params: {
                            apiKey: "YOUR_API_KEY",
                            country: "us",
                        },
                    }
                );
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h1>News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <p className="text-sm text-gray-600">Author: {article.author || "Unknown"}</p>
                        <p className="text-sm text-gray-600">Date: {new Date(article.publishedAt).toDateString()}</p>
                        <p className="text-sm text-gray-600">Source: {article.source.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
