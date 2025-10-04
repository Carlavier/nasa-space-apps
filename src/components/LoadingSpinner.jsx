export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-primary"></div>
    </div>
  )
}