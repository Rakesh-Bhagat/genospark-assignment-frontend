"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  desc: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
}
const PublishedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchPublishProduct() {
      try {
        const response = await axios.get(`/api/products`);
        console.log(response.data.data)
        setProducts(response.data.data);
      } catch (error) { console.log(error)}
    }
    fetchPublishProduct();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600">
              Discover our latest published products
            </p>
          </div>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Admin
          </Link>
        </div>

        {/* Published Products Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Published Products ({products.length})
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            These products are currently live and visible to the public.
          </p>

          {/* Products List */}
          <div className="mt-6 space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {prod.name}
                    </h3>
                    <p className="text-gray-600">{prod.desc}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    {prod.status}
                  </span>
                </div>


                <div className="my-4 flex justify-between text-sm text-gray-500">
                  <span>Updated: {new Date(prod.updated_at).toLocaleDateString()}</span>
                  <span>ID: {prod.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-transparent py-6 text-center text-gray-500 text-sm">
        <p>Productify– Live View</p>
      </footer>
    </div>
    </>
  );
};

export default PublishedProducts;
