from flask import Flask, jsonify, request
from flask_cors import CORS
from quantum import generate_random_bits

app = Flask(__name__)
# Enable CORS for all routes so the separate frontend can access it
CORS(app)

@app.route('/generate', methods=['GET'])
def generate():
    try:
        # Get the number of bits 'n' from query parameters, default to 1
        n = request.args.get('n', default=1, type=int)
        
        # Limit n to a reasonable number to avoid heavy load
        if n > 128:
            return jsonify({'error': 'Maximum requested bits is 128'}), 400
        if n < 1:
            return jsonify({'error': 'Minimum requested bits is 1'}), 400
            
        random_bits = generate_random_bits(n)
        
        return jsonify({
            'success': True,
            'length': n,
            'result': random_bits,
            'decimal': int(random_bits, 2) if random_bits else 0
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
