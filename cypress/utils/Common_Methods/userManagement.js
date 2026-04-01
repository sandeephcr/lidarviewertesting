
export const verifySorted = (selector, order = 'asc') => {
    cy.get(selector).then(($cells) => {

      const values = [...$cells].map(el =>
        el.innerText.trim().replace(/\s+/g, ' ').toLowerCase()
      );
    
      const sorted = [...values].sort((a, b) =>
        a.localeCompare(b)
      );
    
      if (order === 'desc') sorted.reverse();
    
      // 🔍 Find exact mismatch
      values.forEach((val, i) => {
        if (val !== sorted[i]) {
          throw new Error(
            `Mismatch at index ${i}\nActual: ${val}\nExpected: ${sorted[i]}`
          );
        }
      });
    
    });
  };