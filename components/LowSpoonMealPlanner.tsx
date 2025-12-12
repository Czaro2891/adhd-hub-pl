import React, { useState } from 'react';
import { Zap, Heart, RefreshCw, Clock, UtensilsCrossed, Flame } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  timeMinutes: number;
  difficulty: 'ultra-easy' | 'super-easy';
  emoji: string;
  energyRequired: 'almost-zero' | 'minimal';
  tags: string[];
}

const LOW_SPOON_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Tortilla z serem (mikrofalówka)',
    ingredients: ['tortilla', 'ser żółty', 'mikrofala'],
    instructions: [
      'Połóż tortillę na talerzu',
      'Posyp serem',
      'Wrzuć do mikrofali na 30 sekund',
      'Zjedz'
    ],
    timeMinutes: 1,
    difficulty: 'ultra-easy',
    emoji: '🌯',
    energyRequired: 'almost-zero',
    tags: ['szybkie', 'ser', 'węglowodany']
  },
  {
    id: '2',
    name: 'Banan z masłem orzechowym',
    ingredients: ['banan', 'masło orzechowe'],
    instructions: [
      'Obierz banana',
      'Weź łyżkę masła orzechowego',
      'Zjedz'
    ],
    timeMinutes: 1,
    difficulty: 'ultra-easy',
    emoji: '🍌',
    energyRequired: 'almost-zero',
    tags: ['protein', 'węglowodany', 'brak przyrządzania']
  },
  {
    id: '3',
    name: 'Jogurt z miodem i granolą',
    ingredients: ['jogurt', 'miód', 'granola'],
    instructions: [
      'Włóż jogurt do miski',
      'Polej miodem',
      'Posyp granolą',
      'Zjedz'
    ],
    timeMinutes: 1,
    difficulty: 'ultra-easy',
    emoji: '🥣',
    energyRequired: 'almost-zero',
    tags: ['szybkie', 'śniadanie', 'brak gotowania']
  },
  {
    id: '4',
    name: 'Chleb tostowy z serem',
    ingredients: ['chleb', 'ser', 'masło'],
    instructions: [
      'Włóż chleb do tostera',
      'Kiedy się zrumieni, wyjmij',
      'Rozmazuj masło',
      'Połóż ser',
      'Zjedz (ser się stopnieje od ciepła)'
    ],
    timeMinutes: 2,
    difficulty: 'ultra-easy',
    emoji: '🍞',
    energyRequired: 'almost-zero',
    tags: ['toster', 'ser', 'węglowodany']
  },
  {
    id: '5',
    name: 'Zupka miso (kocioł)',
    ingredients: ['woda', 'pasta miso', 'tofu z puszki'],
    instructions: [
      'Zagrej wodę (lub użyj czajnika)',
      'Włóż do miski',
      'Rozmieć łyżkę pasty miso',
      'Dodaj tofu z puszki',
      'Zjedz'
    ],
    timeMinutes: 3,
    difficulty: 'super-easy',
    emoji: '🍲',
    energyRequired: 'minimal',
    tags: ['ciepłe', 'azjatyckie', 'mało mycia']
  },
  {
    id: '6',
    name: 'Ser żółty + krakersy',
    ingredients: ['ser żółty', 'krakersy'],
    instructions: [
      'Pokrój ser na kawałki',
      'Połóż na talerziku',
      'Dodaj krakersy',
      'Zjedz'
    ],
    timeMinutes: 2,
    difficulty: 'ultra-easy',
    emoji: '🧀',
    energyRequired: 'almost-zero',
    tags: ['protein', 'brak gotowania', 'rzeczy suche']
  },
  {
    id: '7',
    name: 'Makaron z masłem i czosnkiem',
    ingredients: ['makaron', 'masło', 'czosnek'],
    instructions: [
      'Ugotuj makaron (czekaj)',
      'Odcedź go',
      'Rozmieszaj z masłem i czosnkiem w proszku',
      'Zjedz'
    ],
    timeMinutes: 5,
    difficulty: 'super-easy',
    emoji: '🍝',
    energyRequired: 'minimal',
    tags: ['makaron', 'węglowodany', 'ciepłe']
  },
  {
    id: '8',
    name: 'Piwo + orzechy/chipsy',
    ingredients: ['piwo (opcjonalnie)', 'orzechy lub chipsy'],
    instructions: [
      'Weź torebkę',
      'Weź napój/piwo',
      'Zjedz/wyp'
    ],
    timeMinutes: 0,
    difficulty: 'ultra-easy',
    emoji: '🍺',
    energyRequired: 'almost-zero',
    tags: ['przekąska', 'brak przyrządzania']
  },
  {
    id: '9',
    name: 'Jajka sadzone (patelnia)',
    ingredients: ['jajka', 'masło', 'sól'],
    instructions: [
      'Nagrzej patelnię z masłem',
      'Wbij jajka',
      'Czekaj ~2 minuty',
      'Weź łopatką i podnieś',
      'Przełóż na talerz'
    ],
    timeMinutes: 3,
    difficulty: 'super-easy',
    emoji: '🍳',
    energyRequired: 'minimal',
    tags: ['protein', 'szybkie', 'śniadanie']
  },
  {
    id: '10',
    name: 'Chleb z maślanką',
    ingredients: ['chleb', 'maślanka', 'opcjonalnie: marynata'],
    instructions: [
      'Pokrój chleb na kawałki',
      'Rozmazuj maślankę',
      'Zjedz',
      'Umyj usta bo będzie brudno'
    ],
    timeMinutes: 2,
    difficulty: 'ultra-easy',
    emoji: '🥖',
    energyRequired: 'almost-zero',
    tags: ['węglowodany', 'brak gotowania']
  },
  {
    id: '11',
    name: 'Pudding czekoladowy (mleko)',
    ingredients: ['mleko', 'pudding czekoladowy w proszku'],
    instructions: [
      'Wlej mleko do miski',
      'Wsyp pudding',
      'Mieszaj przez 30 sekund',
      'Czekaj 1-2 minuty'
    ],
    timeMinutes: 3,
    difficulty: 'ultra-easy',
    emoji: '🍫',
    energyRequired: 'almost-zero',
    tags: ['słodkie', 'szybkie', 'dopamina']
  },
  {
    id: '12',
    name: 'Kasza manna (mleko)',
    ingredients: ['mleko', 'kasza manna', 'cukier/miód'],
    instructions: [
      'Wgotuj mleko',
      'Powoli wsyp kaszę (mieszaj!)',
      'Czekaj 2 minuty',
      'Dodaj cukier/miód',
      'Zjedz'
    ],
    timeMinutes: 5,
    difficulty: 'super-easy',
    emoji: '🥣',
    energyRequired: 'minimal',
    tags: ['śniadanie', 'ciepłe', 'węglowodany']
  },
  {
    id: '13',
    name: 'Śledź z cebulą (puszkowany)',
    ingredients: ['śledź z puszki', 'cebula (opcjonalnie)', 'chleb'],
    instructions: [
      'Otwórz puszkę',
      'Włóż na talerz',
      'Dodaj cebulę jeśli masz siłę',
      'Jedz z chlebem'
    ],
    timeMinutes: 2,
    difficulty: 'ultra-easy',
    emoji: '🐟',
    energyRequired: 'almost-zero',
    tags: ['omega-3', 'protein', 'brak gotowania']
  },
  {
    id: '14',
    name: 'Naleśnik z cukrem (patelnia)',
    ingredients: ['mąka', 'mleko', 'jajko', 'cukier'],
    instructions: [
      'Wymieszaj mąkę z mlekiem i jajkiem',
      'Nagrzej patelnię',
      'Wlej ciasto',
      'Czekaj aż się zrumieni',
      'Przewróć',
      'Nałóż cukru lub nutelli',
      'Zjedz'
    ],
    timeMinutes: 5,
    difficulty: 'super-easy',
    emoji: '🥞',
    energyRequired: 'minimal',
    tags: ['słodkie', 'śniadanie', 'dopamina']
  },
  {
    id: '15',
    name: 'Ryż z jajkiem (mikrofala)',
    ingredients: ['ryż (gotowy)', 'jajko', 'sól'],
    instructions: [
      'Włóż ryż do miski',
      'Wbij jajko na wierzch',
      'Przemieszaj',
      'Mikrofala 1-2 minuty',
      'Zjedz'
    ],
    timeMinutes: 3,
    difficulty: 'super-easy',
    emoji: '🍚',
    energyRequired: 'minimal',
    tags: ['azjatyckie', 'protein', 'węglowodany']
  }
];

interface FavoriteRecipe {
  recipeId: string;
  savedAt: string;
}

const LowSpoonMealPlanner: React.FC = () => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useLocalStorage<FavoriteRecipe[]>('adhd-hub-favorite-recipes', []);
  const [showFavorites, setShowFavorites] = useState(false);

  const generateRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * LOW_SPOON_RECIPES.length);
    setCurrentRecipe(LOW_SPOON_RECIPES[randomIndex]);
    setShowFavorites(false);
  };

  const toggleFavorite = (recipeId: string) => {
    const exists = favorites.some((f) => f.recipeId === recipeId);
    if (exists) {
      setFavorites(favorites.filter((f) => f.recipeId !== recipeId));
    } else {
      setFavorites([...favorites, { recipeId, savedAt: new Date().toISOString() }]);
    }
  };

  const isFavorited = (recipeId: string) => {
    return favorites.some((f) => f.recipeId === recipeId);
  };

  const favoriteRecipes = LOW_SPOON_RECIPES.filter((r) =>
    favorites.some((f) => f.recipeId === r.id)
  );

  return (
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-10 transition-colors">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-warm-900 dark:text-warm-100 mb-2">
          Posiłek na Niskiej Energii 🔋
        </h2>
        <p className="text-warm-600 dark:text-warm-400">
          Mam 5% baterii (dopaminy). Powiedz mi co zjeść.
        </p>
      </div>

      {/* Big Energy Button */}
      <div className="mb-8">
        <button
          onClick={generateRandomRecipe}
          className="w-full py-6 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-2xl font-bold text-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Zap size={32} className="animate-pulse" />
          Mam 5% baterii!
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 justify-center">
        <button
          onClick={() => setShowFavorites(false)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            !showFavorites
              ? 'bg-brand-600 text-white'
              : 'bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          Losuj
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
            showFavorites
              ? 'bg-brand-600 text-white'
              : 'bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          <Heart size={16} />
          Ulubione ({favorites.length})
        </button>
      </div>

      {/* Display Current Recipe */}
      {!showFavorites && currentRecipe ? (
        <div className="bg-gradient-to-br from-warm-50 to-warm-100 dark:from-warm-800 dark:to-warm-900 rounded-2xl p-8 border-2 border-warm-200 dark:border-warm-700">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{currentRecipe.emoji}</div>
            <h3 className="text-3xl font-bold text-warm-900 dark:text-warm-100 mb-2">
              {currentRecipe.name}
            </h3>
            <div className="flex items-center justify-center gap-6 text-warm-600 dark:text-warm-400">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span className="font-bold">{currentRecipe.timeMinutes} min</span>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed size={20} />
                <span className="font-bold">{currentRecipe.ingredients.length} składniki</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame size={20} />
                <span className="font-bold">
                  {currentRecipe.difficulty === 'ultra-easy' ? 'Ultra łatwe' : 'Super łatwe'}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6 bg-white dark:bg-warm-900 rounded-xl p-4">
            <h4 className="font-bold text-warm-900 dark:text-warm-100 mb-3">Składniki:</h4>
            <ul className="space-y-2">
              {currentRecipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center gap-2 text-warm-700 dark:text-warm-300">
                  <span className="text-green-500 font-bold">✓</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-6 bg-white dark:bg-warm-900 rounded-xl p-4">
            <h4 className="font-bold text-warm-900 dark:text-warm-100 mb-3">Instrukcje:</h4>
            <ol className="space-y-2">
              {currentRecipe.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3 text-warm-700 dark:text-warm-300">
                  <span className="font-bold text-brand-600 dark:text-brand-400 flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {currentRecipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={generateRandomRecipe}
              className="flex-1 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Inny przepis
            </button>
            <button
              onClick={() => toggleFavorite(currentRecipe.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isFavorited(currentRecipe.id)
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  : 'bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
              }`}
            >
              <Heart size={20} fill={isFavorited(currentRecipe.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      ) : showFavorites ? (
        <div>
          {favoriteRecipes.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-warm-300 dark:text-warm-700 mb-4" />
              <p className="text-warm-500 dark:text-warm-400 text-lg">Brak ulubionych przepisów</p>
              <p className="text-warm-400 dark:text-warm-500 text-sm mt-2">
                Kliknij serce żeby dodać przepis do ulubionych
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {favoriteRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => {
                    setCurrentRecipe(recipe);
                    setShowFavorites(false);
                  }}
                  className="text-left p-4 bg-warm-50 dark:bg-warm-800/50 rounded-xl border-2 border-warm-200 dark:border-warm-700 hover:border-brand-400 dark:hover:border-brand-600 transition-all"
                >
                  <div className="text-4xl mb-2">{recipe.emoji}</div>
                  <h4 className="font-bold text-warm-900 dark:text-warm-100">{recipe.name}</h4>
                  <div className="text-sm text-warm-600 dark:text-warm-400 mt-2 flex items-center gap-2">
                    <Clock size={14} /> {recipe.timeMinutes} min
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Zap size={48} className="mx-auto text-warm-300 dark:text-warm-700 mb-4" />
          <p className="text-warm-500 dark:text-warm-400 text-lg">Kliknij przycisk "Mam 5% baterii!"</p>
          <p className="text-warm-400 dark:text-warm-500 text-sm mt-2">
            A my losowo wybierzemy dla Ciebie przepis
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300">
        <p className="font-medium mb-2">💡 Wskazówka:</p>
        <p className="text-xs">
          Wszystkie przepisy wymagają max 3 składników, zero krojenia i max 5 minut. 
          Żaden z nich nie wymaga od Ciebie energii, której nie masz.
          Jeśli nawet to jest za dużo — jedz cokolwiek co masz pod ręką. To się liczy!
        </p>
      </div>
    </div>
  );
};

export default LowSpoonMealPlanner;
