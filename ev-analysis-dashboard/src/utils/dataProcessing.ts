

export const processDataInChunks = <T>(
  data: T[],
  chunkSize: number = 1000,
  processor: (chunk: T[]) => any
): Promise<any[]> => {
  return new Promise((resolve) => {
    const results: any[] = [];
    let index = 0;

    const processChunk = () => {
      const chunk = data.slice(index, index + chunkSize);
      if (chunk.length === 0) {
        resolve(results);
        return;
      }

      const result = processor(chunk);
      results.push(result);
      index += chunkSize;

      // Use requestIdleCallback for better performance
      if (window.requestIdleCallback) {
        window.requestIdleCallback(processChunk);
      } else {
        setTimeout(processChunk, 0);
      }
    };

    processChunk();
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};