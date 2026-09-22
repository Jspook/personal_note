import sys
import pymupdf

def is_text_heavy(doc, threshold=50):
    text_length = 0
    num_pages = len(doc)
    for page in doc:
        text_length += len(page.get_text("text").strip())
    
    avg_text_per_page = text_length / num_pages if num_pages > 0 else 0
    return avg_text_per_page > threshold

def extract_text(pdf_path):
    try:
        doc = pymupdf.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        return False
        
    if is_text_heavy(doc):
        with open("extracted_text.txt", "w", encoding="utf-8") as f:
            f.write(f"--- Fast-path extraction for {pdf_path} ---\n")
            for i, page in enumerate(doc):
                f.write(f"## Page {i+1}\n\n")
                f.write(page.get_text("text"))
                f.write("\n\n")
        print("Text extracted to extracted_text.txt")
        return True
    else:
        print("PDF appears to be image-heavy or complex. Routing to Docling MCP...")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pdf_fast_path.py <pdf_path>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    extracted = extract_text(pdf_path)
    if not extracted:
        sys.exit(2) # exit code 2 indicates fallback to docling
