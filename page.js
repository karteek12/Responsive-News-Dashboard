import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Responsive Dashboard
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Manage your articles and payouts efficiently.
      </p>
      <Link href="/login">
        <a>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600">
            Go to Login
          </button>
        </a>
      </Link>
    </div>
  );
}
