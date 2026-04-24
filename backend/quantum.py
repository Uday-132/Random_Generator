from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

def generate_random_bits(n=1):
    """
    Generates n random bits using a quantum circuit.
    Applies a Hadamard gate to put the qubit in a superposition,
    and measures it. We use n qubits to generate n bits in one shot.
    """
    if n <= 0:
        return ""
    
    # Create a quantum circuit with n qubits and n classical bits
    circuit = QuantumCircuit(n, n)
    
    # Apply Hadamard gate to all qubits to create superposition
    for i in range(n):
        circuit.h(i)
        
    # Measure all qubits
    circuit.measure(range(n), range(n))
    
    # Use the Aer simulator
    simulator = AerSimulator()
    
    # Execute the circuit. AerSimulator supports run directly.
    result = simulator.run(circuit, shots=1).result()
    
    # Get counts
    counts = result.get_counts(circuit)
    
    # Since we only run 1 shot, there is only one key in the counts dictionary
    # The key is a binary string of length n
    bit_string = list(counts.keys())[0]
    
    return bit_string

if __name__ == "__main__":
    print("1 bit:", generate_random_bits(1))
    print("8 bits:", generate_random_bits(8))
