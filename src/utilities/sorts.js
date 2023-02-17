/**
 * Sorts an array of objects by the order of a given array of keys
 * Sắp xếp một mảng các đối tượng theo thứ tự của một mảng các khóa cho trước
 */

export const mapOrder = (array, order, key) => {
   array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
   return array;
};

