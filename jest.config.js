module.exports = {
	// Other Jest configurations...
  
	// Add the transform configuration
	transform: {
	  '^.+\\.tsx?$': 'ts-jest',
	},
  
	// Set the module type to 'commonjs'
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleType: 'commonjs',
  };
  