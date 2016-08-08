
var expect = chai.expect;

// Expected results (similarities & preference) are generated from the numerical
// example "CLUSTERING TWO-DIMENSIONAL DATA POINTS" found in the Data Sets section
// of http://www.psi.toronto.edu/index.php?q=affinity%20propagation

describe('affinity propagation', function() {

  var cy;
  var nodes;
  var n1, n2, n3, n4, n5,
      n6, n7, n8, n9, n10,
      n11, n12, n13, n14, n15,
      n16, n17, n18, n19, n20,
      n21, n22, n23, n24, n25;

  var options;
  var expectedClusters;
  var clusters;

  before(function(done) {
    cytoscape({
      elements: {
        nodes: [
          { data: { id: '001' }, position: { x: -2.341500, y: 3.696800 } },
          { data: { id: '002' }, position: { x: -1.109200, y: 3.111700 } },
          { data: { id: '003' }, position: { x: -1.566900, y: 1.835100 } },
          { data: { id: '004' }, position: { x: -2.658500, y: 0.664900 } },
          { data: { id: '005' }, position: { x: -4.031700, y: 2.845700 } },
          { data: { id: '006' }, position: { x: -3.081000, y: 2.101100 } },
          { data: { id: '007' }, position: { x: 2.588000, y: 1.781900 } },
          { data: { id: '008' }, position: { x: 3.292300, y: 3.058500 } },
          { data: { id: '009' }, position: { x: 4.031700, y: 1.622300 } },
          { data: { id: '010' }, position: { x: 3.081000, y: -0.611700 } },
          { data: { id: '011' }, position: { x: 0.264100, y: 0.398900 } },
          { data: { id: '012' }, position: { x: 1.320400, y: 2.207400 } },
          { data: { id: '013' }, position: { x: 0.193700, y: 3.643600 } },
          { data: { id: '014' }, position: { x: 1.954200, y: -0.505300 } },
          { data: { id: '015' }, position: { x: 1.637300, y: 1.409600 } },
          { data: { id: '016' }, position: { x: -0.123200, y: -1.516000 } },
          { data: { id: '017' }, position: { x: -1.355600, y: -3.058500 } },
          { data: { id: '018' }, position: { x: 0.017600, y: -4.016000 } },
          { data: { id: '019' }, position: { x: 1.003500, y: -3.590400 } },
          { data: { id: '020' }, position: { x: 0.017600, y: -2.420200 } },
          { data: { id: '021' }, position: { x: -1.531700, y: -0.930900 } },
          { data: { id: '022' }, position: { x: -1.144400, y: 0.505300 } },
          { data: { id: '023' }, position: { x: 0.616200, y: -1.516000 } },
          { data: { id: '024' }, position: { x: 1.707700, y: -2.207400 } },
          { data: { id: '025' }, position: { x: 2.095100, y: 3.430900 } }
        ],
        edges: [
          { data: { source: '001', target: '002', weight: -1.860905 } },
          { data: { source: '001', target: '003', weight: -4.065932 } },
          { data: { source: '001', target: '004', weight: -9.292907 } },
          { data: { source: '001', target: '005', weight: -3.581147 } },
          { data: { source: '001', target: '006', weight: -3.093119 } },
          { data: { source: '001', target: '007', weight: -27.966812 } },
          { data: { source: '001', target: '008', weight: -32.147129 } },
          { data: { source: '001', target: '009', weight: -44.921228 } },
          { data: { source: '001', target: '010', weight: -47.966678 } },
          { data: { source: '001', target: '011', weight: -17.665296 } },
          { data: { source: '001', target: '012', weight: -15.627824 } },
          { data: { source: '001', target: '013', weight: -6.430069 } },
          { data: { source: '001', target: '014', weight: -36.110683 } },
          { data: { source: '001', target: '015', weight: -21.062133 } },
          { data: { source: '001', target: '016', weight: -32.094139 } },
          { data: { source: '001', target: '017', weight: -46.606077 } },
          { data: { source: '001', target: '018', weight: -65.052637 } },
          { data: { source: '001', target: '019', weight: -64.292309 } },
          { data: { source: '001', target: '020', weight: -42.983042 } },
          { data: { source: '001', target: '021', weight: -22.071383 } },
          { data: { source: '001', target: '022', weight: -11.618721 } },
          { data: { source: '001', target: '023', weight: -35.921273 } },
          { data: { source: '001', target: '024', weight: -51.255598 } },
          { data: { source: '001', target: '025', weight: -19.754122 } },
          { data: { source: '002', target: '001', weight: -1.860905 } },
          { data: { source: '002', target: '003', weight: -1.839197 } },
          { data: { source: '002', target: '004', weight: -8.387161 } },
          { data: { source: '002', target: '005', weight: -8.611762 } },
          { data: { source: '002', target: '006', weight: -4.909308 } },
          { data: { source: '002', target: '007', weight: -15.437656 } },
          { data: { source: '002', target: '008', weight: -19.376032 } },
          { data: { source: '002', target: '009', weight: -28.647165 } },
          { data: { source: '002', target: '010', weight: -31.421484 } },
          { data: { source: '002', target: '011', weight: -9.245237 } },
          { data: { source: '002', target: '012', weight: -6.720715 } },
          { data: { source: '002', target: '013', weight: -1.980466 } },
          { data: { source: '002', target: '014', weight: -22.467109 } },
          { data: { source: '002', target: '015', weight: -10.440407 } },
          { data: { source: '002', target: '016', weight: -22.387803 } },
          { data: { source: '002', target: '017', weight: -38.132081 } },
          { data: { source: '002', target: '018', weight: -52.073786 } },
          { data: { source: '002', target: '019', weight: -49.381646 } },
          { data: { source: '002', target: '020', weight: -31.871596 } },
          { data: { source: '002', target: '021', weight: -16.521121 } },
          { data: { source: '002', target: '022', weight: -6.79456 } },
          { data: { source: '002', target: '023', weight: -24.392612 } },
          { data: { source: '002', target: '024', weight: -36.22775 } },
          { data: { source: '002', target: '025', weight: -10.369427 } },
          { data: { source: '003', target: '001', weight: -4.065932 } },
          { data: { source: '003', target: '002', weight: -1.839197 } },
          { data: { source: '003', target: '004', weight: -2.560959 } },
          { data: { source: '003', target: '005', weight: -7.096551 } },
          { data: { source: '003', target: '006', weight: -2.363255 } },
          { data: { source: '003', target: '007', weight: -17.266024 } },
          { data: { source: '003', target: '008', weight: -25.108532 } },
          { data: { source: '003', target: '009', weight: -31.389606 } },
          { data: { source: '003', target: '010', weight: -27.589805 } },
          { data: { source: '003', target: '011', weight: -5.415231 } },
          { data: { source: '003', target: '012', weight: -8.475109 } },
          { data: { source: '003', target: '013', weight: -6.370385 } },
          { data: { source: '003', target: '014', weight: -17.875617 } },
          { data: { source: '003', target: '015', weight: -10.447948 } },
          { data: { source: '003', target: '016', weight: -13.314141 } },
          { data: { source: '003', target: '017', weight: -23.991969 } },
          { data: { source: '003', target: '018', weight: -36.746011 } },
          { data: { source: '003', target: '019', weight: -36.043006 } },
          { data: { source: '003', target: '020', weight: -20.618218 } },
          { data: { source: '003', target: '021', weight: -7.651995 } },
          { data: { source: '003', target: '022', weight: -1.946874 } },
          { data: { source: '003', target: '023', weight: -15.995797 } },
          { data: { source: '003', target: '024', weight: -27.064811 } },
          { data: { source: '003', target: '025', weight: -15.956822 } },
          { data: { source: '004', target: '001', weight: -9.292907 } },
          { data: { source: '004', target: '002', weight: -8.387161 } },
          { data: { source: '004', target: '003', weight: -2.560959 } },
          { data: { source: '004', target: '005', weight: -6.641567 } },
          { data: { source: '004', target: '006', weight: -2.241177 } },
          { data: { source: '004', target: '007', weight: -28.773451 } },
          { data: { source: '004', target: '008', weight: -41.141342 } },
          { data: { source: '004', target: '009', weight: -45.675391 } },
          { data: { source: '004', target: '010', weight: -34.571568 } },
          { data: { source: '004', target: '011', weight: -8.612347 } },
          { data: { source: '004', target: '012', weight: -18.210951 } },
          { data: { source: '004', target: '013', weight: -17.007699 } },
          { data: { source: '004', target: '014', weight: -22.646369 } },
          { data: { source: '004', target: '015', weight: -19.008476 } },
          { data: { source: '004', target: '016', weight: -11.184071 } },
          { data: { source: '004', target: '017', weight: -15.561256 } },
          { data: { source: '004', target: '018', weight: -29.072336 } },
          { data: { source: '004', target: '019', weight: -31.517822 } },
          { data: { source: '004', target: '020', weight: -16.679353 } },
          { data: { source: '004', target: '021', weight: -3.816256 } },
          { data: { source: '004', target: '022', weight: -2.317971 } },
          { data: { source: '004', target: '023', weight: -15.479985 } },
          { data: { source: '004', target: '024', weight: -27.31381 } },
          { data: { source: '004', target: '025', weight: -30.247469 } },
          { data: { source: '005', target: '001', weight: -3.581147 } },
          { data: { source: '005', target: '002', weight: -8.611762 } },
          { data: { source: '005', target: '003', weight: -7.096551 } },
          { data: { source: '005', target: '004', weight: -6.641567 } },
          { data: { source: '005', target: '006', weight: -1.45826 } },
          { data: { source: '005', target: '007', weight: -44.952099 } },
          { data: { source: '005', target: '008', weight: -53.68626 } },
          { data: { source: '005', target: '009', weight: -66.515127 } },
          { data: { source: '005', target: '010', weight: -62.544116 } },
          { data: { source: '005', target: '011', weight: -24.440728 } },
          { data: { source: '005', target: '012', weight: -29.052401 } },
          { data: { source: '005', target: '013', weight: -18.49065 } },
          { data: { source: '005', target: '014', weight: -47.0602 } },
          { data: { source: '005', target: '015', weight: -34.199944 } },
          { data: { source: '005', target: '016', weight: -34.300799 } },
          { data: { source: '005', target: '017', weight: -42.021089 } },
          { data: { source: '005', target: '018', weight: -63.479757 } },
          { data: { source: '005', target: '019', weight: -66.776622 } },
          { data: { source: '005', target: '020', weight: -44.126533 } },
          { data: { source: '005', target: '021', weight: -20.512708 } },
          { data: { source: '005', target: '022', weight: -13.813973 } },
          { data: { source: '005', target: '023', weight: -40.627401 } },
          { data: { source: '005', target: '024', weight: -58.474532 } },
          { data: { source: '005', target: '025', weight: -37.880137 } },
          { data: { source: '006', target: '001', weight: -3.093119 } },
          { data: { source: '006', target: '002', weight: -4.909308 } },
          { data: { source: '006', target: '003', weight: -2.363255 } },
          { data: { source: '006', target: '004', weight: -2.241177 } },
          { data: { source: '006', target: '005', weight: -1.45826 } },
          { data: { source: '006', target: '007', weight: -32.23945 } },
          { data: { source: '006', target: '008', weight: -41.535568 } },
          { data: { source: '006', target: '009', weight: -50.819751 } },
          { data: { source: '006', target: '010', weight: -45.329528 } },
          { data: { source: '006', target: '011', weight: -14.087179 } },
          { data: { source: '006', target: '012', weight: -19.383622 } },
          { data: { source: '006', target: '013', weight: -13.102966 } },
          { data: { source: '006', target: '014', weight: -32.14656 } },
          { data: { source: '006', target: '015', weight: -22.740527 } },
          { data: { source: '006', target: '016', weight: -21.831993 } },
          { data: { source: '006', target: '017', weight: -29.598477 } },
          { data: { source: '006', target: '018', weight: -47.020234 } },
          { data: { source: '006', target: '019', weight: -49.076312 } },
          { data: { source: '006', target: '020', weight: -30.043476 } },
          { data: { source: '006', target: '021', weight: -11.593354 } },
          { data: { source: '006', target: '022', weight: -6.296997 } },
          { data: { source: '006', target: '023', weight: -26.7527 } },
          { data: { source: '006', target: '024', weight: -41.49482 } },
          { data: { source: '006', target: '025', weight: -28.560379 } },
          { data: { source: '007', target: '001', weight: -27.966812 } },
          { data: { source: '007', target: '002', weight: -15.437656 } },
          { data: { source: '007', target: '003', weight: -17.266024 } },
          { data: { source: '007', target: '004', weight: -28.773451 } },
          { data: { source: '007', target: '005', weight: -44.952099 } },
          { data: { source: '007', target: '006', weight: -32.23945 } },
          { data: { source: '007', target: '008', weight: -2.125746 } },
          { data: { source: '007', target: '009', weight: -2.109742 } },
          { data: { source: '007', target: '010', weight: -5.97237 } },
          { data: { source: '007', target: '011', weight: -7.3132 } },
          { data: { source: '007', target: '012', weight: -1.78786 } },
          { data: { source: '007', target: '013', weight: -9.198599 } },
          { data: { source: '007', target: '014', weight: -5.632986 } },
          { data: { source: '007', target: '015', weight: -1.042438 } },
          { data: { source: '007', target: '016', weight: -18.22675 } },
          { data: { source: '007', target: '017', weight: -38.981453 } },
          { data: { source: '007', target: '018', weight: -40.222601 } },
          { data: { source: '007', target: '019', weight: -31.372248 } },
          { data: { source: '007', target: '020', weight: -24.264601 } },
          { data: { source: '007', target: '021', weight: -24.331212 } },
          { data: { source: '007', target: '022', weight: -15.560517 } },
          { data: { source: '007', target: '023', weight: -14.76414 } },
          { data: { source: '007', target: '024', weight: -16.689443 } },
          { data: { source: '007', target: '025', weight: -2.962151 } },
          { data: { source: '008', target: '001', weight: -32.147129 } },
          { data: { source: '008', target: '002', weight: -19.376032 } },
          { data: { source: '008', target: '003', weight: -25.108532 } },
          { data: { source: '008', target: '004', weight: -41.141342 } },
          { data: { source: '008', target: '005', weight: -53.68626 } },
          { data: { source: '008', target: '006', weight: -41.535568 } },
          { data: { source: '008', target: '007', weight: -2.125746 } },
          { data: { source: '008', target: '009', weight: -2.609383 } },
          { data: { source: '008', target: '010', weight: -13.515016 } },
          { data: { source: '008', target: '011', weight: -16.243467 } },
          { data: { source: '008', target: '012', weight: -4.612761 } },
          { data: { source: '008', target: '013', weight: -9.943664 } },
          { data: { source: '008', target: '014', weight: -14.491182 } },
          { data: { source: '008', target: '015', weight: -5.457896 } },
          { data: { source: '008', target: '016', weight: -32.591691 } },
          { data: { source: '008', target: '017', weight: -59.020663 } },
          { data: { source: '008', target: '018', weight: -60.77221 } },
          { data: { source: '008', target: '019', weight: -49.446477 } },
          { data: { source: '008', target: '020', weight: -40.739814 } },
          { data: { source: '008', target: '021', weight: -39.186288 } },
          { data: { source: '008', target: '022', weight: -26.203137 } },
          { data: { source: '008', target: '023', weight: -28.087561 } },
          { data: { source: '008', target: '024', weight: -30.24066 } },
          { data: { source: '008', target: '025', weight: -1.57197 } },
          { data: { source: '009', target: '001', weight: -44.921228 } },
          { data: { source: '009', target: '002', weight: -28.647165 } },
          { data: { source: '009', target: '003', weight: -31.389606 } },
          { data: { source: '009', target: '004', weight: -45.675391 } },
          { data: { source: '009', target: '005', weight: -66.515127 } },
          { data: { source: '009', target: '006', weight: -50.819751 } },
          { data: { source: '009', target: '007', weight: -2.109742 } },
          { data: { source: '009', target: '008', weight: -2.609383 } },
          { data: { source: '009', target: '010', weight: -5.894586 } },
          { data: { source: '009', target: '011', weight: -15.691517 } },
          { data: { source: '009', target: '012', weight: -7.69349 } },
          { data: { source: '009', target: '013', weight: -18.815898 } },
          { data: { source: '009', target: '014', weight: -8.842688 } },
          { data: { source: '009', target: '015', weight: -5.778393 } },
          { data: { source: '009', target: '016', weight: -27.112121 } },
          { data: { source: '009', target: '017', weight: -50.93289 } },
          { data: { source: '009', target: '018', weight: -47.903426 } },
          { data: { source: '009', target: '019', weight: -36.342237 } },
          { data: { source: '009', target: '020', weight: -32.454805 } },
          { data: { source: '009', target: '021', weight: -37.47025 } },
          { data: { source: '009', target: '022', weight: -28.0397 } },
          { data: { source: '009', target: '023', weight: -21.514567 } },
          { data: { source: '009', target: '024', weight: -20.067578 } },
          { data: { source: '009', target: '025', weight: -7.021454 } },
          { data: { source: '010', target: '001', weight: -47.966679 } },
          { data: { source: '010', target: '002', weight: -31.421484 } },
          { data: { source: '010', target: '003', weight: -27.589805 } },
          { data: { source: '010', target: '004', weight: -34.571568 } },
          { data: { source: '010', target: '005', weight: -62.544116 } },
          { data: { source: '010', target: '006', weight: -45.329528 } },
          { data: { source: '010', target: '007', weight: -5.97237 } },
          { data: { source: '010', target: '008', weight: -13.515016 } },
          { data: { source: '010', target: '009', weight: -5.894586 } },
          { data: { source: '010', target: '011', weight: -8.956238 } },
          { data: { source: '010', target: '012', weight: -11.047037 } },
          { data: { source: '010', target: '013', weight: -26.444079 } },
          { data: { source: '010', target: '014', weight: -1.280999 } },
          { data: { source: '010', target: '015', weight: -6.169923 } },
          { data: { source: '010', target: '016', weight: -11.084656 } },
          { data: { source: '010', target: '017', weight: -25.67025 } },
          { data: { source: '010', target: '018', weight: -20.973678 } },
          { data: { source: '010', target: '019', weight: -13.18866 } },
          { data: { source: '010', target: '020', weight: -12.655092 } },
          { data: { source: '010', target: '021', weight: -21.37889 } },
          { data: { source: '010', target: '022', weight: -19.101694 } },
          { data: { source: '010', target: '023', weight: -6.892998 } },
          { data: { source: '010', target: '024', weight: -4.432211 } },
          { data: { source: '010', target: '025', weight: -17.314614 } },
          { data: { source: '011', target: '001', weight: -17.665296 } },
          { data: { source: '011', target: '002', weight: -9.245237 } },
          { data: { source: '011', target: '003', weight: -5.415231 } },
          { data: { source: '011', target: '004', weight: -8.612347 } },
          { data: { source: '011', target: '005', weight: -24.440728 } },
          { data: { source: '011', target: '006', weight: -14.087179 } },
          { data: { source: '011', target: '007', weight: -7.3132 } },
          { data: { source: '011', target: '008', weight: -16.243467 } },
          { data: { source: '011', target: '009', weight: -15.691517 } },
          { data: { source: '011', target: '010', weight: -8.956238 } },
          { data: { source: '011', target: '012', weight: -4.386442 } },
          { data: { source: '011', target: '013', weight: -10.533034 } },
          { data: { source: '011', target: '014', weight: -3.674016 } },
          { data: { source: '011', target: '015', weight: -2.907193 } },
          { data: { source: '011', target: '016', weight: -3.816843 } },
          { data: { source: '011', target: '017', weight: -14.577043 } },
          { data: { source: '011', target: '018', weight: -19.552104 } },
          { data: { source: '011', target: '019', weight: -16.461227 } },
          { data: { source: '011', target: '020', weight: -8.008087 } },
          { data: { source: '011', target: '021', weight: -4.993266 } },
          { data: { source: '011', target: '022', weight: -1.995193 } },
          { data: { source: '011', target: '023', weight: -3.790816 } },
          { data: { source: '011', target: '024', weight: -8.876781 } },
          { data: { source: '011', target: '025', weight: -12.545585 } },
          { data: { source: '012', target: '001', weight: -15.627824 } },
          { data: { source: '012', target: '002', weight: -6.720715 } },
          { data: { source: '012', target: '003', weight: -8.475109 } },
          { data: { source: '012', target: '004', weight: -18.210951 } },
          { data: { source: '012', target: '005', weight: -29.052401 } },
          { data: { source: '012', target: '006', weight: -19.383622 } },
          { data: { source: '012', target: '007', weight: -1.78786 } },
          { data: { source: '012', target: '008', weight: -4.612761 } },
          { data: { source: '012', target: '009', weight: -7.69349 } },
          { data: { source: '012', target: '010', weight: -11.047037 } },
          { data: { source: '012', target: '011', weight: -4.386442 } },
          { data: { source: '012', target: '013', weight: -3.332123 } },
          { data: { source: '012', target: '014', weight: -7.760444 } },
          { data: { source: '012', target: '015', weight: -0.73691 } },
          { data: { source: '012', target: '016', weight: -15.947689 } },
          { data: { source: '012', target: '017', weight: -34.890679 } },
          { data: { source: '012', target: '018', weight: -40.427995 } },
          { data: { source: '012', target: '019', weight: -33.71491 } },
          { data: { source: '012', target: '020', weight: -23.11197 } },
          { data: { source: '012', target: '021', weight: -17.983401 } },
          { data: { source: '012', target: '022', weight: -8.972383 } },
          { data: { source: '012', target: '023', weight: -14.359605 } },
          { data: { source: '012', target: '024', weight: -19.64046 } },
          { data: { source: '012', target: '025', weight: -2.097112 } },
          { data: { source: '013', target: '001', weight: -6.430069 } },
          { data: { source: '013', target: '002', weight: -1.980466 } },
          { data: { source: '013', target: '003', weight: -6.370385 } },
          { data: { source: '013', target: '004', weight: -17.007699 } },
          { data: { source: '013', target: '005', weight: -18.49065 } },
          { data: { source: '013', target: '006', weight: -13.102966 } },
          { data: { source: '013', target: '007', weight: -9.198599 } },
          { data: { source: '013', target: '008', weight: -9.943664 } },
          { data: { source: '013', target: '009', weight: -18.815898 } },
          { data: { source: '013', target: '010', weight: -26.444079 } },
          { data: { source: '013', target: '011', weight: -10.533034 } },
          { data: { source: '013', target: '012', weight: -3.332123 } },
          { data: { source: '013', target: '014', weight: -20.312731 } },
          { data: { source: '013', target: '015', weight: -7.074737 } },
          { data: { source: '013', target: '016', weight: -26.721898 } },
          { data: { source: '013', target: '017', weight: -47.318475 } },
          { data: { source: '013', target: '018', weight: -58.700483 } },
          { data: { source: '013', target: '019', weight: -52.986532 } },
          { data: { source: '013', target: '020', weight: -36.800682 } },
          { data: { source: '013', target: '021', weight: -23.903055 } },
          { data: { source: '013', target: '022', weight: -11.639438 } },
          { data: { source: '013', target: '023', weight: -26.799978 } },
          { data: { source: '013', target: '024', weight: -36.526397 } },
          { data: { source: '013', target: '025', weight: -3.660563 } },
          { data: { source: '014', target: '001', weight: -36.110683 } },
          { data: { source: '014', target: '002', weight: -22.467109 } },
          { data: { source: '014', target: '003', weight: -17.875617 } },
          { data: { source: '014', target: '004', weight: -22.646369 } },
          { data: { source: '014', target: '005', weight: -47.0602 } },
          { data: { source: '014', target: '006', weight: -32.14656 } },
          { data: { source: '014', target: '007', weight: -5.632986 } },
          { data: { source: '014', target: '008', weight: -14.491182 } },
          { data: { source: '014', target: '009', weight: -8.842688 } },
          { data: { source: '014', target: '010', weight: -1.280999 } },
          { data: { source: '014', target: '011', weight: -3.674016 } },
          { data: { source: '014', target: '012', weight: -7.760444 } },
          { data: { source: '014', target: '013', weight: -20.312731 } },
          { data: { source: '014', target: '015', weight: -3.767268 } },
          { data: { source: '014', target: '016', weight: -5.337105 } },
          { data: { source: '014', target: '017', weight: -17.473606 } },
          { data: { source: '014', target: '018', weight: -16.075434 } },
          { data: { source: '014', target: '019', weight: -10.421672 } },
          { data: { source: '014', target: '020', weight: -7.417262 } },
          { data: { source: '014', target: '021', weight: -12.332634 } },
          { data: { source: '014', target: '022', weight: -10.622634 } },
          { data: { source: '014', target: '023', weight: -2.811758 } },
          { data: { source: '014', target: '024', weight: -2.957907 } },
          { data: { source: '014', target: '025', weight: -15.513523 } },
          { data: { source: '015', target: '001', weight: -21.062133 } },
          { data: { source: '015', target: '002', weight: -10.440407 } },
          { data: { source: '015', target: '003', weight: -10.447948 } },
          { data: { source: '015', target: '004', weight: -19.008476 } },
          { data: { source: '015', target: '005', weight: -34.199944 } },
          { data: { source: '015', target: '006', weight: -22.740527 } },
          { data: { source: '015', target: '007', weight: -1.042438 } },
          { data: { source: '015', target: '008', weight: -5.457896 } },
          { data: { source: '015', target: '009', weight: -5.778393 } },
          { data: { source: '015', target: '010', weight: -6.169923 } },
          { data: { source: '015', target: '011', weight: -2.907193 } },
          { data: { source: '015', target: '012', weight: -0.73691 } },
          { data: { source: '015', target: '013', weight: -7.074737 } },
          { data: { source: '015', target: '014', weight: -3.767268 } },
          { data: { source: '015', target: '016', weight: -11.658496 } },
          { data: { source: '015', target: '017', weight: -28.921368 } },
          { data: { source: '015', target: '018', weight: -32.060563 } },
          { data: { source: '015', target: '019', weight: -25.401702 } },
          { data: { source: '015', target: '020', weight: -17.290796 } },
          { data: { source: '015', target: '021', weight: -15.520501 } },
          { data: { source: '015', target: '022', weight: -8.555613 } },
          { data: { source: '015', target: '023', weight: -9.601781 } },
          { data: { source: '015', target: '024', weight: -13.087645 } },
          { data: { source: '015', target: '025', weight: -4.295235 } },
          { data: { source: '016', target: '001', weight: -32.094139 } },
          { data: { source: '016', target: '002', weight: -22.387803 } },
          { data: { source: '016', target: '003', weight: -13.314141 } },
          { data: { source: '016', target: '004', weight: -11.184071 } },
          { data: { source: '016', target: '005', weight: -34.300799 } },
          { data: { source: '016', target: '006', weight: -21.831993 } },
          { data: { source: '016', target: '007', weight: -18.22675 } },
          { data: { source: '016', target: '008', weight: -32.59169 } },
          { data: { source: '016', target: '009', weight: -27.112121 } },
          { data: { source: '016', target: '010', weight: -11.084656 } },
          { data: { source: '016', target: '011', weight: -3.816843 } },
          { data: { source: '016', target: '012', weight: -15.947689 } },
          { data: { source: '016', target: '013', weight: -26.721898 } },
          { data: { source: '016', target: '014', weight: -5.337105 } },
          { data: { source: '016', target: '015', weight: -11.658496 } },
          { data: { source: '016', target: '017', weight: -3.898116 } },
          { data: { source: '016', target: '018', weight: -6.269825 } },
          { data: { source: '016', target: '019', weight: -5.572588 } },
          { data: { source: '016', target: '020', weight: -0.837402 } },
          { data: { source: '016', target: '021', weight: -2.326214 } },
          { data: { source: '016', target: '022', weight: -5.128503 } },
          { data: { source: '016', target: '023', weight: -0.546712 } },
          { data: { source: '016', target: '024', weight: -3.830229 } },
          { data: { source: '016', target: '025', weight: -29.392674 } },
          { data: { source: '017', target: '001', weight: -46.606077 } },
          { data: { source: '017', target: '002', weight: -38.132081 } },
          { data: { source: '017', target: '003', weight: -23.991969 } },
          { data: { source: '017', target: '004', weight: -15.561256 } },
          { data: { source: '017', target: '005', weight: -42.021089 } },
          { data: { source: '017', target: '006', weight: -29.598477 } },
          { data: { source: '017', target: '007', weight: -38.981453 } },
          { data: { source: '017', target: '008', weight: -59.020663 } },
          { data: { source: '017', target: '009', weight: -50.93289 } },
          { data: { source: '017', target: '010', weight: -25.67025 } },
          { data: { source: '017', target: '011', weight: -14.577043 } },
          { data: { source: '017', target: '012', weight: -34.890679 } },
          { data: { source: '017', target: '013', weight: -47.318475 } },
          { data: { source: '017', target: '014', weight: -17.473606 } },
          { data: { source: '017', target: '015', weight: -28.921368 } },
          { data: { source: '017', target: '016', weight: -3.898116 } },
          { data: { source: '017', target: '018', weight: -2.802484 } },
          { data: { source: '017', target: '019', weight: -5.84827 } },
          { data: { source: '017', target: '020', weight: -2.293105 } },
          { data: { source: '017', target: '021', weight: -4.557693 } },
          { data: { source: '017', target: '022', weight: -12.745276 } },
          { data: { source: '017', target: '023', weight: -6.267301 } },
          { data: { source: '017', target: '024', weight: -10.108178 } },
          { data: { source: '017', target: '025', weight: -54.019643 } },
          { data: { source: '018', target: '001', weight: -65.052637 } },
          { data: { source: '018', target: '002', weight: -52.073786 } },
          { data: { source: '018', target: '003', weight: -36.746011 } },
          { data: { source: '018', target: '004', weight: -29.072336 } },
          { data: { source: '018', target: '005', weight: -63.479757 } },
          { data: { source: '018', target: '006', weight: -47.020234 } },
          { data: { source: '018', target: '007', weight: -40.222601 } },
          { data: { source: '018', target: '008', weight: -60.77221 } },
          { data: { source: '018', target: '009', weight: -47.903426 } },
          { data: { source: '018', target: '010', weight: -20.973678 } },
          { data: { source: '018', target: '011', weight: -19.552104 } },
          { data: { source: '018', target: '012', weight: -40.427995 } },
          { data: { source: '018', target: '013', weight: -58.700483 } },
          { data: { source: '018', target: '014', weight: -16.075434 } },
          { data: { source: '018', target: '015', weight: -32.060563 } },
          { data: { source: '018', target: '016', weight: -6.269825 } },
          { data: { source: '018', target: '017', weight: -2.802484 } },
          { data: { source: '018', target: '019', weight: -1.153134 } },
          { data: { source: '018', target: '020', weight: -2.546578 } },
          { data: { source: '018', target: '021', weight: -11.918172 } },
          { data: { source: '018', target: '022', weight: -21.792398 } },
          { data: { source: '018', target: '023', weight: -6.608322 } },
          { data: { source: '018', target: '024', weight: -6.127472 } },
          { data: { source: '018', target: '025', weight: -59.772326 } },
          { data: { source: '019', target: '001', weight: -64.292309 } },
          { data: { source: '019', target: '002', weight: -49.381646 } },
          { data: { source: '019', target: '003', weight: -36.043006 } },
          { data: { source: '019', target: '004', weight: -31.517822 } },
          { data: { source: '019', target: '005', weight: -66.776622 } },
          { data: { source: '019', target: '006', weight: -49.076312 } },
          { data: { source: '019', target: '007', weight: -31.372248 } },
          { data: { source: '019', target: '008', weight: -49.446477 } },
          { data: { source: '019', target: '009', weight: -36.342237 } },
          { data: { source: '019', target: '010', weight: -13.18866 } },
          { data: { source: '019', target: '011', weight: -16.461227 } },
          { data: { source: '019', target: '012', weight: -33.71491 } },
          { data: { source: '019', target: '013', weight: -52.986532 } },
          { data: { source: '019', target: '014', weight: -10.421673 } },
          { data: { source: '019', target: '015', weight: -25.401702 } },
          { data: { source: '019', target: '016', weight: -5.572588 } },
          { data: { source: '019', target: '017', weight: -5.84827 } },
          { data: { source: '019', target: '018', weight: -1.153134 } },
          { data: { source: '019', target: '020', weight: -2.341367 } },
          { data: { source: '019', target: '021', weight: -13.500179 } },
          { data: { source: '019', target: '022', weight: -21.388233 } },
          { data: { source: '019', target: '023', weight: -4.453137 } },
          { data: { source: '019', target: '024', weight: -2.408587 } },
          { data: { source: '019', target: '025', weight: -50.490244 } },
          { data: { source: '020', target: '001', weight: -42.983042 } },
          { data: { source: '020', target: '002', weight: -31.871596 } },
          { data: { source: '020', target: '003', weight: -20.618218 } },
          { data: { source: '020', target: '004', weight: -16.679353 } },
          { data: { source: '020', target: '005', weight: -44.126533 } },
          { data: { source: '020', target: '006', weight: -30.043476 } },
          { data: { source: '020', target: '007', weight: -24.264601 } },
          { data: { source: '020', target: '008', weight: -40.739814 } },
          { data: { source: '020', target: '009', weight: -32.454805 } },
          { data: { source: '020', target: '010', weight: -12.655092 } },
          { data: { source: '020', target: '011', weight: -8.008087 } },
          { data: { source: '020', target: '012', weight: -23.11197 } },
          { data: { source: '020', target: '013', weight: -36.800682 } },
          { data: { source: '020', target: '014', weight: -7.417262 } },
          { data: { source: '020', target: '015', weight: -17.290796 } },
          { data: { source: '020', target: '016', weight: -0.837402 } },
          { data: { source: '020', target: '017', weight: -2.293105 } },
          { data: { source: '020', target: '018', weight: -2.546578 } },
          { data: { source: '020', target: '019', weight: -2.341367 } },
          { data: { source: '020', target: '021', weight: -4.618345 } },
          { data: { source: '020', target: '022', weight: -9.908794 } },
          { data: { source: '020', target: '023', weight: -1.1759 } },
          { data: { source: '020', target: '024', weight: -2.901722 } },
          { data: { source: '020', target: '025', weight: -38.551377 } },
          { data: { source: '021', target: '001', weight: -22.071383 } },
          { data: { source: '021', target: '002', weight: -16.521121 } },
          { data: { source: '021', target: '003', weight: -7.651995 } },
          { data: { source: '021', target: '004', weight: -3.816256 } },
          { data: { source: '021', target: '005', weight: -20.512708 } },
          { data: { source: '021', target: '006', weight: -11.593354 } },
          { data: { source: '021', target: '007', weight: -24.331212 } },
          { data: { source: '021', target: '008', weight: -39.186288 } },
          { data: { source: '021', target: '009', weight: -37.47025 } },
          { data: { source: '021', target: '010', weight: -21.37889 } },
          { data: { source: '021', target: '011', weight: -4.993266 } },
          { data: { source: '021', target: '012', weight: -17.983401 } },
          { data: { source: '021', target: '013', weight: -23.903055 } },
          { data: { source: '021', target: '014', weight: -12.332634 } },
          { data: { source: '021', target: '015', weight: -15.520501 } },
          { data: { source: '021', target: '016', weight: -2.326214 } },
          { data: { source: '021', target: '017', weight: -4.557693 } },
          { data: { source: '021', target: '018', weight: -11.918173 } },
          { data: { source: '021', target: '019', weight: -13.500179 } },
          { data: { source: '021', target: '020', weight: -4.618345 } },
          { data: { source: '021', target: '022', weight: -2.212672 } },
          { data: { source: '021', target: '023', weight: -4.955816 } },
          { data: { source: '021', target: '024', weight: -12.123165 } },
          { data: { source: '021', target: '025', weight: -32.178977 } },
          { data: { source: '022', target: '001', weight: -11.618721 } },
          { data: { source: '022', target: '002', weight: -6.79456 } },
          { data: { source: '022', target: '003', weight: -1.946874 } },
          { data: { source: '022', target: '004', weight: -2.317971 } },
          { data: { source: '022', target: '005', weight: -13.813973 } },
          { data: { source: '022', target: '006', weight: -6.296997 } },
          { data: { source: '022', target: '007', weight: -15.560517 } },
          { data: { source: '022', target: '008', weight: -26.203137 } },
          { data: { source: '022', target: '009', weight: -28.0397 } },
          { data: { source: '022', target: '010', weight: -19.101694 } },
          { data: { source: '022', target: '011', weight: -1.995193 } },
          { data: { source: '022', target: '012', weight: -8.972383 } },
          { data: { source: '022', target: '013', weight: -11.639438 } },
          { data: { source: '022', target: '014', weight: -10.622634 } },
          { data: { source: '022', target: '015', weight: -8.555613 } },
          { data: { source: '022', target: '016', weight: -5.128503 } },
          { data: { source: '022', target: '017', weight: -12.745276 } },
          { data: { source: '022', target: '018', weight: -21.792398 } },
          { data: { source: '022', target: '019', weight: -21.388233 } },
          { data: { source: '022', target: '020', weight: -9.908794 } },
          { data: { source: '022', target: '021', weight: -2.212672 } },
          { data: { source: '022', target: '023', weight: -7.185366 } },
          { data: { source: '022', target: '024', weight: -15.493216 } },
          { data: { source: '022', target: '025', weight: -19.053496 } },
          { data: { source: '023', target: '001', weight: -35.921273 } },
          { data: { source: '023', target: '002', weight: -24.392612 } },
          { data: { source: '023', target: '003', weight: -15.995797 } },
          { data: { source: '023', target: '004', weight: -15.479985 } },
          { data: { source: '023', target: '005', weight: -40.627401 } },
          { data: { source: '023', target: '006', weight: -26.7527 } },
          { data: { source: '023', target: '007', weight: -14.76414 } },
          { data: { source: '023', target: '008', weight: -28.087561 } },
          { data: { source: '023', target: '009', weight: -21.514567 } },
          { data: { source: '023', target: '010', weight: -6.892998 } },
          { data: { source: '023', target: '011', weight: -3.790816 } },
          { data: { source: '023', target: '012', weight: -14.359605 } },
          { data: { source: '023', target: '013', weight: -26.799978 } },
          { data: { source: '023', target: '014', weight: -2.811758 } },
          { data: { source: '023', target: '015', weight: -9.601781 } },
          { data: { source: '023', target: '016', weight: -0.546712 } },
          { data: { source: '023', target: '017', weight: -6.267301 } },
          { data: { source: '023', target: '018', weight: -6.608322 } },
          { data: { source: '023', target: '019', weight: -4.453137 } },
          { data: { source: '023', target: '020', weight: -1.1759 } },
          { data: { source: '023', target: '021', weight: -4.955816 } },
          { data: { source: '023', target: '022', weight: -7.185366 } },
          { data: { source: '023', target: '024', weight: -1.669406 } },
          { data: { source: '023', target: '025', weight: -26.658965 } },
          { data: { source: '024', target: '001', weight: -51.255598 } },
          { data: { source: '024', target: '002', weight: -36.22775 } },
          { data: { source: '024', target: '003', weight: -27.064811 } },
          { data: { source: '024', target: '004', weight: -27.31381 } },
          { data: { source: '024', target: '005', weight: -58.474532 } },
          { data: { source: '024', target: '006', weight: -41.49482 } },
          { data: { source: '024', target: '007', weight: -16.689443 } },
          { data: { source: '024', target: '008', weight: -30.24066 } },
          { data: { source: '024', target: '009', weight: -20.067578 } },
          { data: { source: '024', target: '010', weight: -4.432211 } },
          { data: { source: '024', target: '011', weight: -8.876781 } },
          { data: { source: '024', target: '012', weight: -19.64046 } },
          { data: { source: '024', target: '013', weight: -36.526397 } },
          { data: { source: '024', target: '014', weight: -2.957907 } },
          { data: { source: '024', target: '015', weight: -13.087645 } },
          { data: { source: '024', target: '016', weight: -3.830229 } },
          { data: { source: '024', target: '017', weight: -10.108178 } },
          { data: { source: '024', target: '018', weight: -6.127472 } },
          { data: { source: '024', target: '019', weight: -2.408587 } },
          { data: { source: '024', target: '020', weight: -2.901722 } },
          { data: { source: '024', target: '021', weight: -12.123165 } },
          { data: { source: '024', target: '022', weight: -15.493216 } },
          { data: { source: '024', target: '023', weight: -1.669406 } },
          { data: { source: '024', target: '025', weight: -31.940506 } },
          { data: { source: '025', target: '001', weight: -19.754122 } },
          { data: { source: '025', target: '002', weight: -10.369427 } },
          { data: { source: '025', target: '003', weight: -15.956822 } },
          { data: { source: '025', target: '004', weight: -30.247469 } },
          { data: { source: '025', target: '005', weight: -37.880137 } },
          { data: { source: '025', target: '006', weight: -28.560379 } },
          { data: { source: '025', target: '007', weight: -2.962151 } },
          { data: { source: '025', target: '008', weight: -1.57197 } },
          { data: { source: '025', target: '009', weight: -7.021454 } },
          { data: { source: '025', target: '010', weight: -17.314614 } },
          { data: { source: '025', target: '011', weight: -12.545585 } },
          { data: { source: '025', target: '012', weight: -2.097112 } },
          { data: { source: '025', target: '013', weight: -3.660563 } },
          { data: { source: '025', target: '014', weight: -15.513523 } },
          { data: { source: '025', target: '015', weight: -4.295235 } },
          { data: { source: '025', target: '016', weight: -29.392674 } },
          { data: { source: '025', target: '017', weight: -54.019643 } },
          { data: { source: '025', target: '018', weight: -59.772326 } },
          { data: { source: '025', target: '019', weight: -50.490244 } },
          { data: { source: '025', target: '020', weight: -38.551377 } },
          { data: { source: '025', target: '021', weight: -32.178977 } },
          { data: { source: '025', target: '022', weight: -19.053496 } },
          { data: { source: '025', target: '023', weight: -26.658965 } },
          { data: { source: '025', target: '024', weight: -31.940506 } }
        ]
      },
      ready: function() {
        cy    = this;
        nodes = cy.nodes();

        n1 = cy.$('#001'); n2 = cy.$('#002'); n3 = cy.$('#003'); n4 = cy.$('#004'); n5 = cy.$('#005');
        n6 = cy.$('#006'); n7 = cy.$('#007'); n8 = cy.$('#008'); n9 = cy.$('#009'); n10 = cy.$('#010');
        n11 = cy.$('#006'); n12 = cy.$('#012'); n13 = cy.$('#013'); n14 = cy.$('#014'); n15 = cy.$('#015');
        n16 = cy.$('#016'); n17 = cy.$('#017'); n18 = cy.$('#018'); n19 = cy.$('#019'); n20 = cy.$('#020');
        n21 = cy.$('#021'); n22 = cy.$('#022'); n23 = cy.$('#023'); n24 = cy.$('#014'); n25 = cy.$('#025');

        options = {
          preference: 'median',
          damping: 0.6,
          maxIterations: 500,
          testMode: true
        };

        expectedClusters = {
          '001': '003',
          '002': '003',
          '003': '003',
          '004': '003',
          '005': '003',
          '006': '003',
          '007': '007',
          '008': '007',
          '009': '007',
          '010': '007',
          '011': '003',
          '012': '007',
          '013': '003',
          '014': '007',
          '015': '007',
          '016': '020',
          '017': '020',
          '018': '020',
          '019': '020',
          '020': '020',
          '021': '020',
          '022': '003',
          '023': '020',
          '024': '020',
          '025': '007' };

        clusters = cy.elements().affinityPropagation( options );

        done();
      }
    });
  });

  function classify(node, clusters) {
    var found = null;

    for (var c = 0; clusters.length; c++) {
      var cluster = clusters[c];
      for (var e = 0; e < cluster.length; e++) {
        if (node === cluster[e]) {
          found = c;
          return found;
        }
      }
    }
  }

  function found(node, cluster) {
    for (var n = 0; n < cluster.length; n++) {
      if (node === cluster[n]) {
        return true;
      }
    }
    return false;
  }

  function printMatrix( M ) { // used for debugging purposes only
    var n = Math.sqrt(M.length);
    for ( var i = 0; i < n; i++ ) {
      var row = '';
      for ( var j = 0; j < n; j++ ) {
        row += M[i*n+j] + ' ';
      }
      console.log(row);
    }
  }


  it('clusters should be returned in an array', function() {
    expect(clusters).to.exist;
    expect(clusters.constructor === Array).to.be.true;
  });

  it('all nodes should be assigned to a cluster', function() {
    var total = 0;
    for (var i = 0; i < clusters.length; i++) {
      total += clusters[i].length;
    }
    expect(total).to.equal(nodes.length);
  });

  it('nodes cannot be assigned to more than one cluster', function() {
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];

      // Find which cluster the node belongs to.
      var cluster = classify(node, clusters);
      expect(cluster).to.exist;

      // Iterate through all other clusters to make sure the node
      // is not found in any other cluster.
      for (var c = 0; c < clusters.length; c++) {
        if (cluster !== c) {
          var duplicate = found(node, clusters[c]);
          expect(duplicate).to.be.false;
        }
      }
    }
  });

  it('should always return the same clusters', function() {
    // Run affinity propagation several times.
    for (var i = 0; i < 10; i++) {
      var clusters2 = cy.elements().affinityPropagation( options );

      expect(clusters2).to.exist;
      expect(clusters2.length).to.equal(clusters.length);
      expect(clusters2).to.deep.equal(clusters);
    }
  });

  it('should return the numerically correct results (expected results)', function() {

    expect(clusters.length).to.equal(3);

    // Cluster with node 3 as exemplar
    expect(clusters[0][0].id()).to.equal('001');
    expect(clusters[0][1].id()).to.equal('002');
    expect(clusters[0][2].id()).to.equal('003');
    expect(clusters[0][3].id()).to.equal('004');
    expect(clusters[0][4].id()).to.equal('005');
    expect(clusters[0][5].id()).to.equal('006');
    expect(clusters[0][6].id()).to.equal('011');
    expect(clusters[0][7].id()).to.equal('013');
    expect(clusters[0][8].id()).to.equal('022');

    // Cluster with node 7 as exemplar
    expect(clusters[1][0].id()).to.equal('007');
    expect(clusters[1][1].id()).to.equal('008');
    expect(clusters[1][2].id()).to.equal('009');
    expect(clusters[1][3].id()).to.equal('010');
    expect(clusters[1][4].id()).to.equal('012');
    expect(clusters[1][5].id()).to.equal('014');
    expect(clusters[1][6].id()).to.equal('015');
    expect(clusters[1][7].id()).to.equal('025');

    // Cluster with node 20 as exemplar
    expect(clusters[2][0].id()).to.equal('016');
    expect(clusters[2][1].id()).to.equal('017');
    expect(clusters[2][2].id()).to.equal('018');
    expect(clusters[2][3].id()).to.equal('019');
    expect(clusters[2][4].id()).to.equal('020');
    expect(clusters[2][5].id()).to.equal('021');
    expect(clusters[2][6].id()).to.equal('023');
    expect(clusters[2][7].id()).to.equal('024');

  });

});