export function getSerializeData(data = []) {
  if (data?.length === 0) return { uniqueCategories: [], serializedData: [] };

  const reduceData = [...data];

  const categoryMap = reduceData?.reduce(
    (acc, item) => {
      if (!acc?.uniqueCategories?.includes(item.category)) {
        acc.uniqueCategories.push(item.category);
      }
      let categoryData = acc?.serializedData?.find(
        (category) => category?.category === item?.category
      );
      if (!categoryData) {
        categoryData = { category: item.category, items: [] };
        acc?.serializedData?.push(categoryData);
      }
      categoryData?.items?.push(item);

      return acc;
    },
    { uniqueCategories: [], serializedData: [] }
  );

  const finalData = categoryMap?.serializedData?.flatMap(
    (category) => category?.items
  );

  return {
    uniqueCategories: categoryMap?.uniqueCategories,
    serializedData: finalData,
  };
}

export function getCategoriesPercentage(projects = []) {
  const categoryCount = {};
  const uniqueCategories = new Set();

  if (projects.length === 0) return { categoryPercentage: {}, categories: [] };
  projects.forEach((project) => {
    const category = project.category;
    uniqueCategories.add(category);

    if (categoryCount[category]) {
      categoryCount[category]++;
    } else {
      categoryCount[category] = 1;
    }
  });

  const totalProjects = projects.length;

  const categoryPercentage = {};
  for (const category in categoryCount) {
    categoryPercentage[category] = parseFloat(
      (categoryCount[category] / totalProjects).toFixed(4)
    );
  }

  const uniqueCategoriesArray = Array.from(uniqueCategories).map(
    (category) => ({ category })
  );

  return {
    categoryPercentage,
    categories: uniqueCategoriesArray,
  };
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const clamp = (min, value, max) => Math.min(Math.max(value, min), max);
export const mapRange = (from, to, value, min, max) =>
  ((value - from) * (max - min)) / (to - from) + min;

