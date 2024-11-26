from flask import Flask, request, jsonify, url_for
import os
from werkzeug.utils import secure_filename
import subprocess
import uuid
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'output'
app.config['PREDICTED_COUNT_FOLDER'] = 'predictedCount'
# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
os.makedirs(app.config['PREDICTED_COUNT_FOLDER'], exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Generate a unique file index (e.g., a UUID) for naming output files
    file_index = str(uuid.uuid4())

    # Run `run.py` with the uploaded file and file index
    result = subprocess.run(
        ["python", "run.py", file_path, file_index],
        capture_output=True, text=True
    )

    # Check for errors in `run.py` execution
    if result.returncode != 0:
        return jsonify({"error": "Failed to process the image", "details": result.stderr}), 500

    # Path for output image
    output_image_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{file_index}.png")

    # Check if output files were created
    if os.path.exists(output_image_path):
        # Return a JSON with the path to the processed image
        return jsonify({"image_url": url_for('static', filename=f"output/{file_index}.png", _external=True)})
    else:
        return jsonify({"error": "Failed to generate output image"}), 500

if __name__ == '__main__':
    app.run(debug=True)
