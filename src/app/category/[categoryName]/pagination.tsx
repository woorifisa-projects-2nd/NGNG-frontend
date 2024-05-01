type Page = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({ page, setPage }: Page) {

  return (
    <div >
      <button type="button" onClick={() => setPage(page - 1)}
        className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-black text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600">
        {page}</button>
    </div>
  );
}