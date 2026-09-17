// Register required series modules before any chart renders.
// Scatter depends on both Line and Column internals.
import "highcharts/es-modules/Series/Column/ColumnSeries.js";
import "highcharts/es-modules/Series/Line/LineSeries.js";
import "highcharts/es-modules/Series/Scatter/ScatterSeries.js";
