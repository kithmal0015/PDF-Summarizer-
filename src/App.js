import React, { useState } from "react";
import axios from "axios";
import { FaMoon, FaSun, FaCopy, FaDownload, FaFileUpload, FaFile } from "react-icons/fa";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif",
      backgroundColor: darkMode ? "#121826" : "#f0f4f8",
      color: darkMode ? "#e2e8f0" : "#2d3748",
      transition: "background-color 0.3s, color 0.3s"
    },
    themeToggle: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      padding: "0.75rem",
      borderRadius: "50%",
      backgroundColor: darkMode ? "#2d3748" : "#ffffff",
      color: darkMode ? "#e2e8f0" : "#4a5568",
      border: "none",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease"
    },
    appCard: {
      backgroundColor: darkMode ? "#1e293b" : "#ffffff",
      borderRadius: "1rem",
      boxShadow: darkMode 
        ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" 
        : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      padding: "2.5rem",
      width: "100%",
      maxWidth: "650px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.3s ease"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "2rem",
      color: darkMode ? "#e2e8f0" : "#2d3748",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    fileInputContainer: {
      width: "100%",
      marginBottom: "1.5rem"
    },
    fileInputLabel: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      height: "8rem",
      borderRadius: "0.75rem",
      backgroundColor: darkMode ? "#293548" : "#f8fafc",
      border: `2px dashed ${darkMode ? "#475569" : "#cbd5e1"}`,
      color: darkMode ? "#94a3b8" : "#64748b",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginBottom: "1rem"
    },
    fileInputActive: {
      borderColor: "#3b82f6",
      backgroundColor: darkMode ? "#1e3a5f" : "#f0f7ff",
      color: "#3b82f6"
    },
    fileInput: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      border: "0"
    },
    filePreview: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.75rem 1rem",
      backgroundColor: darkMode ? "#293548" : "#f1f5f9",
      borderRadius: "0.5rem",
      marginBottom: "1rem"
    },
    fileIcon: {
      color: darkMode ? "#94a3b8" : "#64748b",
      marginRight: "0.75rem"
    },
    fileName: {
      flex: "1",
      color: darkMode ? "#e2e8f0" : "#334155",
      fontWeight: "500",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem", 
      borderRadius: "0.5rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "none",
      width: "100%"
    },
    uploadButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      marginTop: "0.5rem"
    },
    uploadButtonHover: {
      backgroundColor: "#2563eb",
      transform: "translateY(-1px)"
    },
    summaryContainer: {
      width: "100%",
      marginTop: "2rem",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      backgroundColor: darkMode ? "#293548" : "#f8fafc",
      borderLeft: "4px solid #3b82f6",
      boxShadow: darkMode 
        ? "0 4px 6px rgba(0, 0, 0, 0.2)" 
        : "0 4px 6px rgba(0, 0, 0, 0.05)"
    },
    summaryTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: darkMode ? "#e2e8f0" : "#334155",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    summaryText: {
      lineHeight: "1.8",
      color: darkMode ? "#cbd5e1" : "#4b5563",
      whiteSpace: "pre-line",
      marginBottom: "1.5rem"
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      width: "100%"
    },
    copyButton: {
      backgroundColor: "#10b981",
      color: "#ffffff",
      flex: "1"
    },
    copyButtonHover: {
      backgroundColor: "#059669"
    },
    downloadButton: {
      backgroundColor: "#f59e0b",
      color: "#ffffff",
      flex: "1"
    },
    downloadButtonHover: {
      backgroundColor: "#d97706"
    },
    spinner: {
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #3b82f6",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      animation: "spin 1s linear infinite",
      marginRight: "0.5rem"
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [uploadButtonHover, setUploadButtonHover] = useState(false);
  const [copyButtonHover, setCopyButtonHover] = useState(false);
  const [downloadButtonHover, setDownloadButtonHover] = useState(false);
  const [fileInputActive, setFileInputActive] = useState(false);

  return (
    <div style={styles.container}>
      <button
        style={styles.themeToggle}
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <div style={styles.appCard}>
        <h2 style={styles.title}>
          <FaFile /> PDF Summarizer
        </h2>

        <div style={styles.fileInputContainer}>
          <label
            style={{
              ...styles.fileInputLabel,
              ...(fileInputActive ? styles.fileInputActive : {})
            }}
            onDragOver={() => setFileInputActive(true)}
            onDragLeave={() => setFileInputActive(false)}
            onDrop={() => setFileInputActive(false)}
          >
            <FaFileUpload size={28} style={{ marginBottom: "1rem" }} />
            <span>Drag and drop your PDF or click to browse</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={styles.fileInput}
              onFocus={() => setFileInputActive(true)}
              onBlur={() => setFileInputActive(false)}
            />
          </label>

          {file && (
            <div style={styles.filePreview}>
              <FaFile style={styles.fileIcon} />
              <span style={styles.fileName}>{file.name}</span>
              <span style={{ color: darkMode ? "#94a3b8" : "#64748b", fontSize: "0.875rem" }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}

          <button
            onClick={handleUpload}
            style={{
              ...styles.button,
              ...styles.uploadButton,
              ...(uploadButtonHover ? styles.uploadButtonHover : {})
            }}
            onMouseEnter={() => setUploadButtonHover(true)}
            onMouseLeave={() => setUploadButtonHover(false)}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <div
                  style={{
                    ...styles.spinner,
                    animation: "spin 1s linear infinite",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderLeftColor: "#ffffff"
                  }}
                />
                Processing...
              </>
            ) : (
              <>
                <FaFileUpload /> Upload & Summarize
              </>
            )}
          </button>
        </div>

        {summary && (
          <div style={styles.summaryContainer}>
            <h3 style={styles.summaryTitle}>
              📌 Summary Result
            </h3>
            <p style={styles.summaryText}>{summary}</p>

            <div style={styles.actionButtons}>
              <button
                onClick={handleCopy}
                style={{
                  ...styles.button,
                  ...styles.copyButton,
                  ...(copyButtonHover ? styles.copyButtonHover : {})
                }}
                onMouseEnter={() => setCopyButtonHover(true)}
                onMouseLeave={() => setCopyButtonHover(false)}
              >
                <FaCopy /> Copy
              </button>
              <button
                onClick={handleDownload}
                style={{
                  ...styles.button,
                  ...styles.downloadButton,
                  ...(downloadButtonHover ? styles.downloadButtonHover : {})
                }}
                onMouseEnter={() => setDownloadButtonHover(true)}
                onMouseLeave={() => setDownloadButtonHover(false)}
              >
                <FaDownload /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;