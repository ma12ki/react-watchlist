// sortOrder helper for the <Table> component of antd
// you can pass it as the 'sortOrder' property of column config
// see https://ant.design/components/table/#Column
// usage: sortOrder: sortOrder(this.state.sorter, 'name')

// @param sorter - sorter object as passed to the table's 'onChange' object
// @param key - column key
export default (sorter, key) => sorter.columnKey === key && sorter.order;
