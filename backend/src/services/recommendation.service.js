function recommendFromHistory(allContent, user) {
  if (!user.watchHistory?.length) {
    return allContent.filter((c) => c.featured).slice(0, 6);
  }

  const watchedCategories = user.watchHistory.reduce((acc, item) => {
    const category = item.content?.category;
    if (category) acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return [...allContent]
    .sort((a, b) => (watchedCategories[b.category] || 0) - (watchedCategories[a.category] || 0))
    .slice(0, 8);
}

module.exports = { recommendFromHistory };
