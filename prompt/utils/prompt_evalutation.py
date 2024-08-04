import random
from flask import request, jsonify



def prompt_evaluation_another(prompts):
    # prompts = [
    # "Your task as an advanced AI is to perform in-depth analysis on a presented legal contract. Your duties entail interpreting the document, responding accurately to any questions that may arise, identifying specific sections of the contract, clarifying legal terms, and explaining the agreement's stipulations. It's crucial that your responses are not only accurate but also clear and within the context of the contract. However, if you find that the provided information and the user's question are completely unrelated, respond by stating: \"Unrelated data is given, no prompt is generated!\".",
    # "AI, your task is to act as a legal expert. Using your knowledge, you will analyze the given legal contract and provide clear and precise responses based on the document's content. This may involve identifying specific sections, explaining legal jargon, or clarifying particular clauses. Ensure that all of your responses strictly adhere to the context of the contract. In your analysis, remember to be detailed, informative, and accurate while maintaining a high level of understanding of the legal jargon. Always cross-reference your responses with the details in the contract to ensure they are correct and relevant."
    # ]
    elo_ratings = {prompt: 1500 for prompt in prompts}  # Initial ratings

    for _ in range(10):
        elo_ratings = elo_ratings_func(prompts, elo_ratings)

    sorted_prompts = sorted(prompts, key=lambda x: elo_ratings[x], reverse=True)
    ranked_prompt = []
    for index, prompt in enumerate(sorted_prompts):
        item = {'prompt': prompt, 'elo_rating': elo_ratings[prompt]}
        ranked_prompt.append(item)

    return ranked_prompt

def elo_ratings_func(prompts, elo_ratings, K=30, opponent_rating=1600):
    """
    Update Elo ratings for a list of prompts based on simulated outcomes.

    Parameters:
    prompts (list): List of prompts to be evaluated.
    elo_ratings (dict): Current Elo ratings for each prompt.
    K (int): Maximum change in rating.
    opponent_rating (int): Fixed rating of the opponent for simulation.

    Returns:
    dict: Updated Elo ratings.
    """

    for prompt in prompts:
        outcome = random.choice(['win', 'loss', 'draw'])
        actual_score = {'win': 1, 'loss': 0, 'draw': 0.5}[outcome]
        R_base = 10 ** (elo_ratings[prompt] / 400)
        R_opponent = 10 ** (opponent_rating / 400)
        expected_score = R_base / (R_base + R_opponent)
        elo_ratings[prompt] += K * (actual_score - expected_score)

    return elo_ratings
    


def monte_carlo_eval(prompt):
    response_types = ['highly relevant', 'somewhat relevant', 'irrelevant']
    scores = {'highly relevant': 3, 'somewhat relevant': 2, 'irrelevant': 1}
    trials = 100
    total_score = 0
    for _ in range(trials):
        response = random.choice(response_types)
        total_score += scores[response]
    return round(total_score / trials, 2)

def elo_eval(prompt):
    base_rating = 1500
    outcomes = ['win', 'loss', 'draw']
    outcome = random.choice(outcomes)
    K = 30
    R_base = 10 ** (base_rating / 400)
    R_opponent = 10 ** (1600 / 400)
    expected_score = R_base / (R_base + R_opponent)
    actual_score = {'win': 1, 'loss': 0, 'draw': 0.5}[outcome]
    new_rating = base_rating + K * (actual_score - expected_score)
    return round(new_rating, 2)

def test_case_evaluation(test_cases):
    test_cases_prompt_evaluations = []
    for idx, test_case in enumerate(test_cases):
        item = {'test_case': test_case, 'monte_carlo': monte_carlo_eval(test_case), 'elo_rating': elo_eval(test_case)}
        test_cases_prompt_evaluations.append(item)

    test_cases_prompt_evaluations.sort(key=lambda x: x['monte_carlo'], reverse=True)
    return test_cases_prompt_evaluations
        
def prompt_evaluation(prompts):
    prompt_evaluations = []
    for idx, prompt in enumerate(prompts):
        item = {'prompt': prompt, 'monte_carlo': monte_carlo_eval(prompt), 'elo_rating': elo_eval(prompt)}
        prompt_evaluations.append(item)

    prompt_evaluations.sort(key=lambda x: x['monte_carlo'], reverse=True)
    return prompt_evaluations
        
   