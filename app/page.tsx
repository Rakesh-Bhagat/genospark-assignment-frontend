"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { X } from "lucide-react";
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

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Draft");
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get("/api/allProducts", {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.data)
        setProducts(response.data.data);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    setLoading(false);
  }, []);

  const handleDelete = async (ProductId: string) => {
    try {
      const response = await axios.delete(
        `/api/produc/${ProductId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          data: { id: ProductId },
        }
      );
      setProducts((prev) => prev.filter((prod) => prod.id !== ProductId));
    } catch (error) {}
  };
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "/api/product",
        {
          name: productName,
          desc: productDesc,
          status,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      setProducts((prev) => [...prev, { ...response.data.data }]);
      setProductDesc("")
      setProductName("")
      setStatus("Draft")
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (productId: string) => {
    try {
      const response = await axios.put(
        `/api/produc/${productId}`,
        {
          name: productName,
          desc: productDesc,
          status: status
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.data)
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === productId ? { ...prod, ...response.data.data } : prod
        )
      );

      setIsUpdateOpen(false);
      setProductName("");
      setProductDesc("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Products Management
            </h1>
            <p className="text-gray-500">
              Manage your product catalog and publishing status
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link href={"/live"}>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
               View Live Site
            </button>
            </Link>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              Add New Product
            </button>
            {isOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
                {/* Dialog Box */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-lg z-50 text-black ">
                  <div className=" flex items-center justify-end">
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Add a new Product</h2>
                  <p className="mb-1">Product Name</p>
                  <input
                    type="text"
                    className="h-10 w-full rounded-lg  border border-neutral-500 text-black px-3 py-2 mb-4"
                    placeholder="Enter product name "
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p className="mb-1">Product Description</p>
                  <textarea
                    className="h-20 w-full rounded-lg border border-neutral-500 text-gray-500 px-3 py-2 mb-4"
                    placeholder="Description"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />
                  <p className="mb-1">Status:</p>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                    <option value="Published">Published</option>
                  </select>

                  <div className="flex justify-between gap-2">
                    <button
                      className="px-3 py-2 bg-green-600 rounded-md hover:bg-green-400 cursor-pointer w-full sm:w-auto"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created By</th>
              <th className="px-6 py-3">Last Updated</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod.id}
                className="border-t border-neutral-400 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{prod.name}</div>
                  <div className="text-gray-500 text-sm">{prod.desc}</div>
                </td>
                <td className="px-6 py-4">
                  {prod.status === "Published" ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Published
                    </span>
                  ) : prod.status === "Draft" ? (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      Draft
                    </span>
                  ) : (
                    prod.status === "Archived" && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-200 text-gray-800 rounded-full">
                        Archived
                      </span>
                    )
                  )}
                </td>
                <td className="px-6 py-4">{prod.created_by}</td>
                <td className="px-6 py-4">{new Date(prod.updated_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setProductName(prod.name);
                      setProductDesc(prod.desc);
                      setStatus(prod.status);
                      setIsUpdateOpen(true)}}
                  >
                    Edit
                  </button>
                  {isUpdateOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                {/* Dialog Box */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-lg z-50 text-black ">
                  <div className=" flex items-center justify-end">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setIsUpdateOpen(false)}}
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Update Product</h2>
                  <p className="mb-1">Product Name</p>
                  <input
                    type="text"
                    className="h-10 w-full rounded-lg  border border-neutral-500 text-black px-3 py-2 mb-4"
                    placeholder="Enter product name "
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p className="mb-1">Product Description</p>
                  <textarea
                    className="h-20 w-full rounded-lg border border-neutral-500 text-gray-500 px-3 py-2 mb-4"
                    placeholder="Description"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />
                  <p className="mb-1">Status:</p>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                    <option value="Published">Published</option>
                  </select>

                  <div className="flex justify-between gap-2">
                    <button
                      className="px-3 py-2 bg-green-600 rounded-md hover:bg-green-400 cursor-pointer w-full sm:w-auto"
                      onClick={()=>handleUpdate(prod.id)}
                    >
                      Update Product
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setIsUpdateOpen(false)}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default DashboardPage;
