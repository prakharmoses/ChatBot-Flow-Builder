/**
 * Navbar component renders a navigation bar with a "Save Changes" button.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.saveFlow - Callback function to be called when the "Save Changes" button is clicked.
 * @returns {JSX.Element} The rendered Navbar component.
 */

const Navbar = ({ saveFlow }) => {
  return (
    <div className='bg-gray-100 p-2'>
      <button
        onClick={saveFlow}
        className='border-2 border-blue-800 text-blue-800 bg-white rounded-lg font-semibold py-1 px-6 text-center relative left-[86vw] hover:bg-blue-50'
      >
        Save Changes
      </button>
    </div>
  )
}

export default Navbar;
