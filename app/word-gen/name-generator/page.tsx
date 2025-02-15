import NameGeneratorClient from './components/NameGeneratorClient';


export default function NameGenerator() {
  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-xl mb-4">Random Name Generator</h1>
          <NameGeneratorClient />
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">Easy & Simple! High-performance name generator tool (free)</h2>
          <p className="mb-4">
            Our free and easy-to-use tool instantly generates random names! Perfect for:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Creative writing and character development
              <p className="ml-5">Generate unique character names for your stories, novels, or creative projects.</p>
            </li>
            <li>Game development and role-playing games
              <p className="ml-5">Create character names for your games, RPG sessions, or virtual worlds.</p>
            </li>
            <li>Testing and placeholder data
              <p className="ml-5">Generate realistic test data for your applications or databases.</p>
            </li>
          </ul>

          <h3 className="text-lg mb-2 font-bold">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Q1. How does the name generator work?</h4>
              <p className="ml-5">A: The generator combines randomly selected first names (both male and female) with last names from our extensive database to create unique, realistic full names.</p>
            </div>
            <div>
              <h4 className="font-bold">Q2. Are the generated names realistic?</h4>
              <p className="ml-5">A: Yes, all names in our database are real names, ensuring that the generated combinations sound natural and authentic.</p>
            </div>
            <div>
              <h4 className="font-bold">Q3. Can I use these names in my projects?</h4>
              <p className="ml-5">A: Yes, the generated names are free to use in your creative projects, games, or applications.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 