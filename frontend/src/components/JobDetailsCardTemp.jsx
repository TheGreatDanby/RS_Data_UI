import React, { useEffect, useState } from "react";
import { fetchTicketDocuments } from "@/api/ticketAPI";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import { Tab } from "@/components/ui/tab"; // Assume a Tab component is available

export default function JobDetailsCard({ ticket }) {
  const [activeTab, setActiveTab] = useState("invoices"); // 'invoices' or 'estimates'
  const [documents, setDocuments] = useState({
    invoices: [],
    estimates: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    setDocuments((prevState) => ({ ...prevState, loading: true, error: null }));
    fetchTicketDocuments(ticket.id, activeTab)
      .then((data) => {
        setDocuments((prevState) => ({
          ...prevState,
          [activeTab]: data,
          loading: false,
        }));
      })
      .catch((error) => {
        console.error(error);
        setDocuments((prevState) => ({
          ...prevState,
          loading: false,
          error: "Failed to load documents",
        }));
      });
  }, [ticket.id, activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <Card className="bg-red-200">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => handleTabChange("invoices")}
            className={`btn ${activeTab === "invoices" ? "btn-active" : ""}`}
          >
            Invoices
          </button>
          <button
            onClick={() => handleTabChange("estimates")}
            className={`btn ${activeTab === "estimates" ? "btn-active" : ""}`}
          >
            Estimates
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {documents.loading && <p>Loading...</p>}
          {documents.error && <p className="text-red-500">{documents.error}</p>}
          {!documents.loading &&
            !documents.error &&
            (documents[activeTab].length > 0 ? (
              documents[activeTab].map((doc) => (
                <div key={doc._id} className="border p-4 rounded">
                  <p>{doc.number || doc._id}</p>
                  <p>Date: {new Date(doc.created_at).toLocaleDateString()}</p>
                  {/* Additional details can be rendered here */}
                </div>
              ))
            ) : (
              <p>No {activeTab} available.</p>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
