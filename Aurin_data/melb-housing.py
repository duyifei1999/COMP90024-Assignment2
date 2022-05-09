import pandas as pd
df=pd.read_csv('abs_building_approvals_sa2_2016_17-6653574123026993722.csv')
column_houses=[' new_houses_num',' value_new_houses_aud000']
column_residentials=[' new_oth_resial_building_num',' value_new_oth_resial_building_aud000']
total_value_houses=sum(df[' value_new_houses_aud000'])
total_number_houses=sum(df[' new_houses_num'])
average_houses=total_value_houses/total_number_houses
total_value_residentials=sum(df[' value_new_oth_resial_building_aud000'])
total_number_residentials=sum(df[' new_oth_resial_building_num'])
average_residentials=total_value_residentials/total_number_residentials
columns_no=[' sa2_code',' sa2_name']
total_scores=[]
for row in range(len(df)):
    total_score=0
    average_house=0
    average_residential=0
    if df[column_houses[1]][row]!=0:
        average_house=df[column_houses[1]][row]/df[column_houses[0]][row]
    if df[column_residentials[1]][row]!=0:
        average_residential=df[column_residentials[1]][row]/df[column_residentials[0]][row]
    if average_house==0:
        score=0
    else:
        if average_house<=average_houses:
            percent=[0,1,2,3,4]
            for value in percent:
                if (average_houses-average_house)>=value/5*average_houses:
                    score=(value+1)*0.1
        else:
            percent=[0,1,2,3,4]
            for value in percent:
                if (average_house-average_houses)>=value/5*average_houses:
                    score=(value+1)*0.1*(-1)
    total_score+=score
    if average_residential==0:
        score=0
    else:
        if average_residential<=average_residentials:
            percent=[0,1,2,3,4]
            for value in percent:
                if (average_residentials-average_residential)>=value/5*average_residentials:
                    score=(value+1)*0.1
        else:
            percent=[0,1,2,3,4]
            for value in percent:
                if (average_residential-average_residentials)>=value/5*average_residentials:
                    score=(value+1)*0.1*(-1)
    total_score+=score
    total_scores.append(total_score)
df['total_scores']=total_scores
df.to_csv('melb-housing.csv')