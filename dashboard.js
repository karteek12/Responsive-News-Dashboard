"use client";
import { useEffect, useState } from "react";
import RequireAuth from "../components/RequireAuth";
import fileDownload from "js-file-download";
import { jsPDF } from "jspdf";
import { Bar } from "react-chartjs-2";
export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    dateRange: { start: "", end: "" },
    type: "",
  });
  const exportToCSV = () => {
    const headers = ["Title,Author,Date"];
    const rows = filteredArticles.map(
      (article) =>
        `${article.title},${article.author || "Unknown"},${article.publishedAt}`
    );
  
    const csvData = [...headers, ...rows].join("\n");
    fileDownload(csvData, "articles.csv");
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Articles Report", 10, 10);
  
    filteredArticles.forEach((article, index) => {
      doc.text(
        `${index + 1}. ${article.title} | ${article.author || "Unknown"} | ${article.publishedAt}`,
        10,
        20 + index * 10
      );
    });
  
    doc.save("articles.pdf");
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch news.");
        const data = await res.json();
        setArticles(data.articles || []);
        setFilteredArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
      }
    };
  
    fetchNews();
  }, []);
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        (article.author && article.author.toLowerCase().includes(query))
    );

    setFilteredArticles(filtered);
  };
  const analyticsData = {
    labels: filteredArticles.map((article) => article.author || "Unknown"),
    datasets: [
      {
        label: "Articles per Author",
        data: filteredArticles.map((_, index) => index + 1),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const [payoutRate, setPayoutRate] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  
  const calculatePayout = () => {
    const payout = filteredArticles.length * payoutRate;
    setTotalPayout(payout);
  };
  useEffect(() => {
    const savedPayoutRate = localStorage.getItem("payoutRate");
    if (savedPayoutRate) setPayoutRate(Number(savedPayoutRate));
  }, []);
  
  useEffect(() => {
    localStorage.setItem("payoutRate", payoutRate);
  }, [payoutRate]);
  
  const applyFilters = () => {
    let filtered = articles;

    if (filters.author) {
      filtered = filtered.filter(
        (article) =>
          article.author &&
          article.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter((article) => {
        const publishedDate = new Date(article.publishedAt);
        return publishedDate >= startDate && publishedDate <= endDate;
      });
    }

    if (filters.type) {
      filtered = filtered.filter(
        (article) => article.type && article.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    setFilteredArticles(filtered);
  };

  return (
    <RequireAuth>
      <div>
        <h1>Dashboard</h1>
        <div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />

          <div>
  <h2>Payout Calculator</h2>
  <input
    type="number"
    placeholder="Set payout rate per article"
    value={payoutRate}
    onChange={(e) => setPayoutRate(e.target.value)}
  />
  <button onClick={calculatePayout}>Calculate Payout</button>
  <h3>Total Payout: ${totalPayout}</h3>
</div>
<button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 sm:px-6 sm:py-3">
  Export to CSV
</button>

<button onClick={exportToPDF}>Export to PDF</button>
          <div>
            <input
              type="text"
              placeholder="Filter by author"
              value={filters.author}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, author: e.target.value }))
              }
            />
            <input
              type="date"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value },
                }))
              }
            />
             <div>
    <h2>News Analytics</h2>
    <Bar data={analyticsData} />
  </div>
            <input
              type="date"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value },
                }))
              }
            />
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
        <ul>
          {filteredArticles.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>
                {article.author || "Unknown"} - {article.publishedAt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </RequireAuth>
  );
}
