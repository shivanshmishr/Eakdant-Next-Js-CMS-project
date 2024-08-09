import { saveContactFormData } from "../../lib/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const formData = req.body;
      const result = await saveContactFormData(formData);
      res.status(200).json({ message: "Form data saved successfully", result });
    } catch (error) {
      console.error("Error saving form data to Sanity:", error);
      res.status(500).json({ error: "Failed to save form data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}