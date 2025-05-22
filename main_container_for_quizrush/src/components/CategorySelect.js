import React from 'react';

/**
 * CategorySelect component for selecting a trivia category
 */
const CategorySelect = ({ categories, selectedCategory, onSelectCategory }) => {
  const handleChange = (e) => {
    onSelectCategory(e.target.value);
  };

  return (
    <div className="category-select">
      <select 
        value={selectedCategory}
        onChange={handleChange}
        className="category-dropdown"
      >
        {categories.map(category => (
          <option 
            key={category.id} 
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
