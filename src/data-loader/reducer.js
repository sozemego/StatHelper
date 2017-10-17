import actions from './actions';

const fakeData = [['Płeć', 'Wiek', 'Kim byl Frank Wills?', 'kolor', 'osobowosc', 'uklad', '[Podoba mi się ten produkt]', ' [Ten produkt wygląda na drogi]', ' [Ta czekolada jest wyprodukowana z wysokiej jakości składników]', ' [Ten produkt prawdopodobnie jest smaczny]', ' [Ta czekolada byłaby odpowiednia dla osób ceniących zdrowy styl życia]', ' [Opakowanie tego produktu ma ładny kolor]', ' [Ta czekolada byłaby dobrą przekąską]', ' [Chciał(a)bym, żeby ta czekolada znalazła się na półkach sklepowych]', '[Ta marka byłaby konkurencją dla innych producentów czekolad]', ' [Ten produkt nadawałby się dla dzieci]', ' [Ta czekolada trafiłaby do osób aktywnych i/lub zabieganych]', 'Proszę o zaznaczenie wszystkich okoliczności, na które według Pana/Pani nadawałaby się ta czekolada:', 'liczbaSzczerych', 'liczbaEkscytujących', 'Czy jada Pan/Pani czekoladę częściej niż raz na miesiąc?', 'Jeżeli tak, to ile czekolad je Pan/Pani miesięcznie?', 'Czy kupuje Pan/Pani czekoladę częściej niż raz na miesiąc?', 'Jeżeli tak, to ile czekolad kupuje Pan/Pani miesięcznie?', 'Jaka cena wydaje się niska za tą czekoladę?', 'Jaka cena wydaje się wysoka (lecz akceptowalna) za tą czekoladę?', 'Jaka cena wydaje się zbyt wysoka (i nie akceptowalna)?', 'Jaka cena wydaje się zbyt niska (i może oznaczać niską jakość)?', ' [Wiersz 1]', 'Pytanie bez tytułu', ''], ['1', '24', '13', '2', '1', '1', '3', '5', '2', '2', '1', '4', '2', '2', '1', '1', '4', 'Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '0', '0', null, '0', null, '3.00', '9.00', '16.00', '1.00'], ['1', '24', '8', '0', '1', '0', '4', '4', '3', '4', '3', '4', '4', '4', '3', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '0', null, '0', null, '3.00', '4.00', '6.00', '2.00'], ['1', '24', '12', '2', '0', '0', '4', '4', '3', '3', '3', '4', '3', '4', '4', '2', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '0', null, '0', null, '3.00', '6.00', '6.00', '3.00'], ['0', '24', '14', '2', '0', '1', '4', '2', '2', '3', '2', '4', '3', '4', '3', '4', '3', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '1', '2', '1', '2', '2.00', '4.00', '6.00', '1.00'], ['1', '24', '5', '1', '0', '0', '3', '1', '3', '3', '2', '2', '3', '2', '2', '4', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '0', null, '2.00', '4.00', '5.00', '1.50'], ['1', '50', '9', '0', '1', '1', '5', '2', '5', '5', '5', '5', '5', '4', '5', '5', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi', '1', '1', '1', '1', '0', '1', '2.00', '3.00', '5.00', '1.00'], ['1', '24', '10', '0', '0', '1', '4', '2', '5', '4', '2', '2', '4', '2', '2', '2', '2', 'Podwieczorek/ deser w domowym zaciszu', '1', '0', '1', '2', '1', '2', '2.00', '4.99', '8.99', '1.99'], ['1', '24', '7', '1', '0', '1', '3', '2', '1', '4', '1', '2', '4', '2', '4', '4', '4', 'Przekąska w pracy/ szkole, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '0', '1', '5', '1', '5', '2.00', '5.00', '6.00', '2.00'], ['0', '23', '8', '0', '1', '0', '4', '5', '4', '4', '3', '4', '3', '5', '5', '2', '5', 'Impreza/ domówka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '4', '1', '4', '3.00', '8.00', '9.00', '3.00'], ['1', '23', '10', '0', '0', '1', '4', '4', '3', '4', '3', '4', '4', '4', '4', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '2', '0', null, '1.00', '4.00', '5.00', '0.30'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '3', '4', '4', '5', '4', '4', '2', '4', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '3', '1', '6', '1', '4', '2.50', '4.50', '6.00', '1.50'], ['1', '17', '12', '2', '0', '0', '5', '5', '4', '3', '3', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi', '2', '2', '1', '8', '1', '10', '3.00', '6.00', '8.00', '2.00'], ['0', '21', '3', '0', '0', '0', '2', '5', '5', '2', '2', '2', '2', '3', '3', '2', '2', 'Spotkanie z przyjaciółmi, Randka', '1', '1', '1', '2', '1', '2', '4.00', '5.00', '6.00', '3.00'], ['1', '54', '13', '2', '1', '1', '4', '2', '4', '4', '2', '5', '5', '4', '4', '3', '2', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '8', '1', '8', '2.20', '4.50', '5.99', '1.59'], ['0', '36', '6', '1', '1', '1', '5', '5', '4', '3', '2', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '1', '0', null, '0', null, '1.59', '3.59', '4.39', '1.29'], ['1', '47', '14', '2', '0', '1', '3', '2', '4', '4', '4', '2', '4', '2', '3', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '3', '1', '10', '2.00', '4.00', '5.00', '1.50'], ['1', '32', '8', '0', '1', '0', '3', '3', '3', '1', '1', '3', '3', '3', '2', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '4.00', '5.00', '1.00'], ['1', '24', '5', '1', '0', '0', '4', '3', '3', '2', '4', '4', '3', '3', '3', '1', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '1', '2', '1.70', '2.50', '3.00', '1.50'], ['1', '24', '13', '2', '1', '1', '4', '4', '3', '4', '2', '4', '5', '4', '3', '2', '2', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '0', null, '0', null, '2.00', '7.00', '15.00', '1.50'], ['0', '23', '10', '0', '0', '1', '5', '1', '3', '4', '4', '4', '5', '4', '5', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '1', '4', '1', '2', '2.00', '3.00', '4.00', '1.60'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '5', '2', '4', '4', '4', '4', '4', '2', 'Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '1', '1', '3', '1', '3', '1.99', '4.50', '5.99', '0.99'], ['1', '24', '4', '1', '1', '0', '4', '5', '3', '3', '2', '3', '2', '4', '4', '1', '5', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Randka, Piknik na łonie natury', '2', '2', '0', '0', '0', '0', '3.00', '8.00', '10.00', '2.00'], ['1', '24', '14', '2', '0', '1', '3', '2', '2', '2', '4', '2', '3', '3', '3', '2', '2', 'Grill, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '1', '0', null, '4.00', '5.00', '6.00', '2.00'], ['1', '25', '13', '2', '1', '1', '3', '4', '5', '5', '4', '4', '5', '3', '2', '1', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Randka, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '1', '0', null, '3.99', '9.99', '15.99', '1.99'], ['1', '24', '9', '0', '1', '1', '4', '3', '3', '4', '1', '2', '3', '4', '4', '2', '2', 'Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '1', '1', '15', '1', '15', '4.00', '5.00', '10.00', '2.00'], ['1', '19', '14', '2', '0', '1', '5', '2', '4', '4', '2', '5', '4', '4', '3', '3', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '2', '1', '12', '1', '12', '2.00', '4.00', '8.00', '1.00'], ['0', '34', '7', '1', '0', '1', '2', '4', '2', '3', '2', '1', '2', '2', '3', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '1.00', '5.00', '9.00', '0.00'], ['0', '64', '6', '1', '1', '1', '3', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '5.00', '8.00', '1.00'], ['1', '24', '13', '2', '1', '1', '3', '5', '2', '2', '1', '4', '2', '2', '2', '2', '4', 'Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '0', '0', null, '0', null, '3.00', '9.00', '16.00', '1.00'], ['1', '24', '8', '0', '1', '0', '3', '4', '3', '4', '4', '4', '4', '4', '3', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '0', null, '0', null, '3.00', '4.00', '6.00', '2.00'], ['1', '24', '12', '2', '0', '0', '4', '4', '3', '3', '4', '4', '3', '4', '4', '2', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '0', null, '0', null, '3.00', '6.00', '6.00', '3.00'], ['0', '24', '14', '2', '0', '1', '5', '2', '2', '3', '2', '4', '3', '4', '3', '4', '3', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '1', '2', '1', '2', '2.00', '4.00', '6.00', '1.00'], ['1', '24', '5', '1', '0', '0', '2', '1', '3', '3', '2', '2', '3', '2', '2', '4', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '0', null, '2.00', '4.00', '5.00', '1.50'], ['1', '50', '9', '0', '1', '1', '4', '2', '5', '5', '5', '5', '5', '4', '5', '5', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi', '1', '1', '1', '1', '0', '1', '2.00', '3.00', '5.00', '1.00'], ['1', '24', '10', '0', '0', '1', '4', '2', '5', '4', '2', '2', '4', '2', '2', '2', '2', 'Podwieczorek/ deser w domowym zaciszu', '1', '0', '1', '2', '1', '2', '2.00', '4.99', '8.99', '1.99'], ['1', '24', '7', '1', '0', '1', '4', '2', '1', '4', '1', '2', '4', '2', '4', '4', '4', 'Przekąska w pracy/ szkole, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '0', '1', '5', '1', '5', '2.00', '5.00', '6.00', '2.00'], ['0', '23', '8', '0', '1', '0', '4', '5', '4', '4', '3', '4', '3', '5', '5', '2', '5', 'Impreza/ domówka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '4', '1', '4', '3.00', '8.00', '9.00', '3.00'], ['1', '23', '7', '1', '0', '1', '3', '4', '3', '4', '3', '5', '4', '4', '4', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '2', '0', null, '1.00', '4.00', '5.00', '0.30'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '4', '3', '5', '4', '4', '3', '2', '4', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '3', '1', '6', '1', '4', '2.50', '4.50', '6.00', '1.50'], ['1', '17', '12', '2', '0', '0', '4', '5', '5', '4', '3', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi', '2', '2', '1', '8', '1', '10', '3.00', '6.00', '8.00', '2.00'], ['0', '21', '3', '0', '0', '0', '2', '5', '5', '2', '2', '2', '2', '3', '3', '2', '2', 'Spotkanie z przyjaciółmi, Randka', '1', '1', '1', '2', '1', '2', '4.00', '5.00', '6.00', '3.00'], ['1', '54', '13', '2', '1', '1', '4', '2', '4', '4', '2', '5', '5', '4', '4', '3', '2', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '8', '1', '8', '2.20', '4.50', '5.99', '1.59'], ['0', '36', '6', '1', '1', '1', '4', '4', '4', '3', '2', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '1', '0', null, '0', null, '1.59', '3.59', '4.39', '1.29'], ['1', '47', '14', '2', '0', '1', '3', '4', '4', '4', '4', '2', '4', '2', '3', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '3', '1', '10', '2.00', '4.00', '5.00', '1.50'], ['1', '32', '8', '0', '1', '0', '3', '3', '2', '1', '1', '3', '2', '2', '2', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '4.00', '5.00', '1.00'], ['1', '24', '5', '1', '0', '0', '4', '3', '2', '2', '4', '4', '2', '3', '2', '1', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '1', '2', '1.70', '2.50', '3.00', '1.50'], ['1', '24', '13', '2', '1', '1', '4', '4', '3', '4', '2', '4', '5', '4', '4', '4', '2', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '0', null, '0', null, '2.00', '7.00', '15.00', '1.50'], ['0', '23', '7', '1', '0', '1', '5', '1', '3', '4', '4', '4', '5', '5', '5', '5', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '1', '4', '1', '2', '2.00', '3.00', '4.00', '1.60'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '5', '2', '4', '4', '5', '4', '5', '2', 'Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '1', '1', '3', '1', '3', '1.99', '4.50', '5.99', '0.99'], ['1', '24', '4', '1', '1', '0', '4', '5', '4', '4', '1', '3', '2', '4', '4', '1', '5', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Randka, Piknik na łonie natury', '2', '2', '0', '0', '0', '0', '3.00', '8.00', '10.00', '2.00'], ['1', '24', '14', '2', '0', '1', '3', '2', '2', '2', '4', '2', '3', '3', '3', '2', '2', 'Grill, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '1', '0', null, '4.00', '5.00', '6.00', '2.00'], ['1', '25', '13', '2', '1', '1', '3', '4', '5', '5', '4', '4', '5', '3', '2', '1', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Randka, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '1', '0', null, '3.99', '9.99', '15.99', '1.99'], ['1', '24', '9', '0', '1', '1', '3', '3', '3', '4', '1', '2', '3', '4', '4', '2', '2', 'Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '1', '1', '15', '1', '13', '4.00', '5.00', '10.00', '2.00'], ['1', '19', '14', '2', '0', '1', '5', '2', '4', '4', '3', '5', '4', '4', '3', '3', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '2', '1', '12', '1', '12', '2.00', '4.00', '8.00', '1.00'], ['0', '34', '4', '1', '1', '0', '2', '4', '2', '3', '2', '1', '2', '2', '3', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '1.00', '5.00', '9.00', '0.00'], ['0', '64', '12', '2', '0', '0', '3', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '5.00', '8.00', '1.00'], ['1', '24', '13', '2', '1', '1', '3', '5', '2', '2', '1', '4', '2', '2', '1', '1', '4', 'Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '0', '0', null, '0', null, '3.00', '9.00', '16.00', '1.00'], ['1', '24', '8', '0', '1', '0', '4', '4', '3', '4', '3', '4', '4', '4', '3', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '0', null, '0', null, '3.00', '4.00', '6.00', '2.00'], ['1', '24', '12', '2', '0', '0', '4', '4', '3', '3', '3', '4', '3', '4', '4', '2', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '0', null, '0', null, '3.00', '6.00', '6.00', '3.00'], ['0', '24', '14', '2', '0', '1', '4', '2', '2', '3', '2', '4', '3', '4', '3', '4', '3', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '1', '2', '1', '2', '2.00', '4.00', '6.00', '1.00'], ['1', '24', '12', '2', '0', '0', '3', '1', '3', '3', '2', '2', '3', '2', '2', '4', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '0', null, '2.00', '4.00', '5.00', '1.50'], ['1', '50', '9', '0', '1', '1', '5', '2', '5', '5', '5', '5', '5', '4', '5', '5', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi', '1', '1', '1', '1', '0', '1', '2.00', '3.00', '5.00', '1.00'], ['1', '24', '10', '0', '0', '1', '4', '2', '5', '4', '2', '2', '4', '2', '2', '2', '2', 'Podwieczorek/ deser w domowym zaciszu', '1', '0', '1', '2', '1', '2', '2.00', '4.99', '8.99', '1.99'], ['1', '24', '4', '1', '1', '0', '3', '2', '1', '4', '1', '2', '4', '2', '4', '4', '4', 'Przekąska w pracy/ szkole, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '0', '1', '5', '1', '5', '2.00', '5.00', '6.00', '2.00'], ['0', '23', '8', '0', '1', '0', '4', '5', '4', '4', '3', '5', '3', '5', '5', '2', '5', 'Impreza/ domówka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '4', '1', '4', '3.00', '8.00', '9.00', '3.00'], ['1', '23', '4', '1', '1', '0', '4', '5', '2', '4', '3', '4', '4', '4', '4', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '2', '0', null, '1.00', '4.00', '5.00', '0.30'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '4', '3', '5', '4', '4', '3', '2', '4', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '3', '1', '6', '1', '4', '2.50', '4.50', '6.00', '1.50'], ['1', '17', '12', '2', '0', '0', '5', '5', '5', '4', '3', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi', '2', '2', '1', '8', '1', '10', '3.00', '6.00', '8.00', '2.00'], ['0', '21', '3', '0', '0', '0', '2', '5', '5', '2', '2', '2', '2', '3', '3', '2', '2', 'Spotkanie z przyjaciółmi, Randka', '1', '1', '1', '2', '1', '2', '4.00', '5.00', '6.00', '3.00'], ['1', '54', '10', '0', '0', '1', '4', '2', '4', '4', '2', '5', '5', '4', '4', '3', '2', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '8', '1', '8', '2.20', '4.50', '5.99', '1.59'], ['0', '36', '6', '1', '1', '1', '5', '5', '4', '3', '2', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '1', '0', null, '0', null, '1.59', '3.59', '4.39', '1.29'], ['1', '47', '14', '2', '0', '1', '3', '2', '4', '4', '4', '2', '4', '2', '3', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '3', '1', '12', '2.00', '4.00', '5.00', '1.50'], ['1', '32', '8', '0', '1', '0', '3', '3', '2', '1', '1', '3', '2', '2', '2', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '4.00', '5.00', '1.00'], ['1', '24', '5', '1', '0', '0', '4', '3', '2', '2', '3', '5', '2', '3', '2', '1', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '1', '2', '1.70', '2.50', '3.00', '1.50'], ['1', '24', '13', '2', '1', '1', '4', '4', '3', '4', '2', '3', '5', '5', '3', '2', '2', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '0', null, '0', null, '2.00', '7.00', '15.00', '1.50'], ['0', '23', '7', '1', '0', '1', '5', '3', '3', '4', '3', '5', '4', '5', '5', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '1', '4', '1', '2', '2.00', '3.00', '4.00', '1.60'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '5', '2', '3', '4', '5', '4', '4', '2', 'Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '1', '1', '3', '1', '3', '1.99', '4.50', '5.99', '0.99'], ['1', '24', '4', '1', '1', '0', '4', '5', '4', '4', '1', '3', '2', '4', '4', '2', '5', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Randka, Piknik na łonie natury', '2', '2', '0', '0', '0', '0', '3.00', '8.00', '10.00', '2.00'], ['1', '24', '3', '0', '0', '0', '3', '2', '2', '2', '4', '2', '3', '3', '3', '2', '2', 'Grill, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '1', '0', null, '4.00', '5.00', '6.00', '2.00'], ['1', '25', '13', '2', '1', '1', '3', '4', '5', '5', '4', '4', '5', '3', '2', '2', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Randka, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '1', '0', null, '3.99', '9.99', '15.99', '1.99'], ['1', '24', '9', '0', '1', '1', '3', '3', '3', '4', '2', '2', '3', '4', '4', '2', '2', 'Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '1', '1', '15', '1', '10', '4.00', '5.00', '10.00', '2.00'], ['1', '19', '14', '2', '0', '1', '5', '2', '4', '4', '3', '5', '4', '4', '3', '3', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '2', '1', '12', '1', '7', '2.00', '4.00', '8.00', '1.00'], ['0', '34', '9', '0', '1', '1', '3', '4', '2', '3', '2', '1', '2', '2', '3', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '1.00', '5.00', '9.00', '0.00'], ['0', '64', '10', '0', '0', '1', '4', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '5.00', '8.00', '1.00'], ['1', '24', '13', '2', '1', '1', '4', '5', '2', '2', '1', '4', '2', '2', '1', '1', '3', 'Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '0', '0', null, '0', null, '3.00', '9.00', '16.00', '1.00'], ['1', '24', '8', '0', '1', '0', '4', '4', '3', '4', '3', '4', '4', '4', '3', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '0', null, '0', null, '3.00', '4.00', '6.00', '2.00'], ['1', '24', '12', '2', '0', '0', '4', '4', '3', '3', '3', '4', '3', '4', '4', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '0', null, '0', null, '3.00', '6.00', '6.00', '3.00'], ['0', '24', '14', '2', '0', '1', '4', '2', '2', '3', '2', '4', '3', '4', '3', '4', '4', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '1', '2', '1', '2', '2.00', '4.00', '6.00', '1.00'], ['1', '24', '5', '1', '0', '0', '3', '4', '3', '3', '2', '2', '3', '2', '2', '4', '3', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '0', null, '2.00', '4.00', '5.00', '1.50'], ['1', '50', '9', '0', '1', '1', '5', '2', '5', '5', '5', '5', '5', '4', '5', '5', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi', '1', '1', '1', '1', '0', '1', '2.00', '3.00', '5.00', '1.00'], ['1', '24', '10', '0', '0', '1', '4', '2', '5', '4', '2', '2', '4', '2', '2', '2', '2', 'Podwieczorek/ deser w domowym zaciszu', '1', '0', '1', '2', '1', '2', '2.00', '4.99', '8.99', '1.99'], ['1', '24', '7', '1', '0', '1', '3', '2', '1', '4', '1', '2', '4', '2', '4', '4', '4', 'Przekąska w pracy/ szkole, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '0', '1', '5', '1', '5', '2.00', '5.00', '6.00', '2.00'], ['0', '23', '8', '0', '1', '0', '4', '5', '4', '4', '3', '4', '3', '5', '5', '2', '5', 'Impreza/ domówka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '4', '1', '4', '3.00', '8.00', '9.00', '3.00'], ['1', '23', '7', '1', '0', '1', '4', '4', '3', '4', '3', '4', '4', '4', '4', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '2', '0', null, '1.00', '4.00', '5.00', '0.30'], ['1', '23', '5', '1', '0', '0', '5', '4', '4', '4', '3', '5', '4', '4', '4', '2', '4', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '3', '1', '6', '1', '4', '2.50', '4.50', '6.00', '1.50'], ['1', '17', '12', '2', '0', '0', '5', '5', '5', '4', '3', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi', '2', '2', '1', '8', '1', '10', '3.00', '6.00', '8.00', '2.00'], ['0', '21', '3', '0', '0', '0', '2', '5', '5', '2', '2', '2', '2', '3', '4', '2', '2', 'Spotkanie z przyjaciółmi, Randka', '1', '1', '1', '2', '1', '2', '4.00', '5.00', '6.00', '3.00'], ['1', '54', '6', '1', '1', '1', '4', '2', '4', '4', '2', '5', '5', '4', '4', '3', '2', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '8', '1', '8', '2.20', '4.50', '5.99', '1.59'], ['0', '36', '6', '1', '1', '1', '5', '5', '4', '3', '2', '4', '4', '4', '4', '4', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '1', '0', null, '0', null, '1.59', '3.59', '4.39', '1.29'], ['1', '47', '14', '2', '0', '1', '3', '2', '4', '4', '4', '2', '4', '2', '4', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '3', '1', '10', '2.00', '4.00', '5.00', '1.50'], ['1', '32', '3', '0', '0', '0', '3', '3', '2', '1', '1', '3', '2', '2', '2', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '4.00', '5.00', '1.00'], ['1', '24', '4', '1', '1', '0', '4', '3', '2', '2', '4', '4', '2', '3', '2', '5', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '1', '2', '1.70', '2.50', '3.00', '1.50'], ['1', '24', '3', '0', '0', '0', '4', '4', '3', '4', '2', '4', '5', '4', '3', '2', '2', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '0', null, '0', null, '2.00', '7.00', '15.00', '1.50'], ['0', '23', '7', '1', '0', '1', '5', '1', '3', '4', '4', '4', '5', '5', '5', '3', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '1', '4', '1', '2', '2.00', '3.00', '4.00', '1.60'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '5', '2', '4', '4', '5', '4', '3', '2', 'Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '1', '1', '3', '1', '3', '1.99', '4.50', '5.99', '0.99'], ['1', '24', '4', '1', '1', '0', '4', '5', '4', '4', '1', '3', '2', '4', '4', '1', '5', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Randka, Piknik na łonie natury', '2', '2', '0', '0', '0', '0', '3.00', '8.00', '10.00', '2.00'], ['1', '24', '4', '1', '1', '0', '3', '2', '2', '2', '4', '2', '3', '3', '3', '2', '2', 'Grill, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '1', '0', null, '4.00', '5.00', '6.00', '2.00'], ['1', '25', '10', '0', '0', '1', '4', '4', '5', '5', '4', '4', '5', '3', '2', '1', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Randka, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '1', '0', null, '3.99', '9.99', '15.99', '1.99'], ['1', '24', '9', '0', '1', '1', '3', '3', '3', '4', '1', '2', '3', '4', '4', '2', '2', 'Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '1', '1', '15', '1', '8', '4.00', '5.00', '10.00', '2.00'], ['1', '19', '3', '0', '0', '0', '5', '2', '4', '4', '3', '5', '4', '4', '3', '3', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '2', '1', '12', '1', '12', '2.00', '4.00', '8.00', '1.00'], ['0', '34', '7', '1', '0', '1', '2', '4', '2', '3', '2', '1', '2', '2', '3', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '1.00', '5.00', '9.00', '0.00'], ['0', '64', '6', '1', '1', '1', '3', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '5.00', '8.00', '1.00'], ['1', '24', '4', '1', '1', '0', '3', '5', '2', '2', '1', '4', '3', '2', '1', '1', '4', 'Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '0', '0', null, '0', null, '3.00', '9.00', '16.00', '1.00'], ['1', '24', '3', '0', '0', '0', '4', '4', '3', '4', '3', '4', '4', '4', '3', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '0', null, '0', null, '3.00', '4.00', '6.00', '2.00'], ['1', '24', '12', '2', '0', '0', '4', '4', '3', '3', '3', '4', '3', '4', '4', '2', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '0', null, '0', null, '3.00', '6.00', '6.00', '3.00'], ['0', '24', '3', '0', '0', '0', '4', '2', '2', '3', '2', '4', '3', '4', '3', '4', '3', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '1', '2', '1', '2', '2.00', '4.00', '6.00', '1.00'], ['1', '24', '5', '1', '0', '0', '3', '1', '3', '3', '2', '2', '3', '2', '2', '4', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '0', null, '2.00', '4.00', '5.00', '1.50'], ['1', '50', '9', '0', '1', '1', '5', '2', '5', '5', '5', '5', '5', '4', '5', '5', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi', '1', '1', '1', '1', '0', '1', '2.00', '3.00', '5.00', '1.00'], ['1', '24', '10', '0', '0', '1', '4', '2', '2', '4', '2', '2', '4', '2', '2', '2', '2', 'Podwieczorek/ deser w domowym zaciszu', '1', '0', '1', '2', '1', '2', '2.00', '4.99', '8.99', '1.99'], ['1', '24', '7', '1', '0', '1', '3', '2', '2', '4', '1', '2', '4', '2', '4', '5', '4', 'Przekąska w pracy/ szkole, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '0', '1', '5', '1', '5', '2.00', '5.00', '6.00', '2.00'], ['0', '23', '3', '0', '0', '0', '4', '5', '4', '4', '3', '4', '3', '5', '5', '2', '5', 'Impreza/ domówka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '4', '1', '4', '3.00', '8.00', '9.00', '3.00'], ['1', '23', '7', '1', '0', '1', '4', '4', '3', '4', '4', '4', '4', '4', '5', '2', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '2', '0', null, '1.00', '4.00', '5.00', '0.30'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '4', '4', '5', '4', '5', '3', '2', '4', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '3', '1', '6', '1', '4', '2.50', '4.50', '6.00', '1.50'], ['1', '17', '12', '2', '0', '0', '5', '5', '5', '4', '3', '4', '4', '4', '5', '4', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi', '2', '2', '1', '8', '1', '10', '3.00', '6.00', '8.00', '2.00'], ['0', '21', '3', '0', '0', '0', '2', '5', '5', '2', '2', '2', '2', '3', '4', '2', '2', 'Spotkanie z przyjaciółmi, Randka', '1', '1', '1', '2', '1', '3', '4.00', '5.00', '6.00', '3.00'], ['1', '54', '6', '1', '1', '1', '4', '2', '4', '4', '2', '5', '5', '4', '5', '3', '2', 'Impreza/ domówka, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '8', '1', '8', '2.20', '4.50', '5.99', '1.59'], ['0', '36', '6', '1', '1', '1', '5', '5', '4', '3', '2', '4', '4', '4', '5', '4', '3', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Piknik na łonie natury', '2', '1', '0', null, '0', null, '1.59', '3.59', '4.39', '1.29'], ['1', '47', '14', '2', '0', '1', '3', '2', '4', '4', '4', '2', '4', '2', '3', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '1', '1', '3', '1', '16', '2.00', '4.00', '5.00', '1.50'], ['1', '32', '8', '0', '1', '0', '3', '3', '2', '1', '1', '3', '2', '2', '2', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '4.00', '5.00', '1.00'], ['1', '24', '5', '1', '0', '0', '4', '3', '2', '2', '4', '4', '2', '3', '2', '1', '4', 'Przekąska w pracy/ szkole', '1', '0', '1', '2', '1', '2', '1.70', '2.50', '3.00', '1.50'], ['1', '24', '13', '2', '1', '1', '4', '4', '3', '4', '2', '4', '5', '4', '4', '2', '2', 'Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '0', '0', null, '0', null, '2.00', '7.00', '15.00', '1.50'], ['0', '23', '7', '1', '0', '1', '5', '1', '3', '4', '4', '4', '5', '5', '5', '4', '4', 'Impreza/ domówka, Przekąska w pracy/ szkole, Spotkanie z przyjaciółmi, Randka, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '3', '1', '4', '1', '2', '2.00', '3.00', '4.00', '1.60'], ['1', '23', '11', '2', '1', '0', '5', '4', '4', '5', '2', '4', '4', '5', '5', '4', '2', 'Spotkanie z przyjaciółmi, Randka, Podwieczorek/ deser w domowym zaciszu', '2', '1', '1', '3', '1', '3', '1.99', '4.50', '5.99', '0.99'], ['1', '24', '4', '1', '1', '0', '4', '5', '4', '4', '1', '3', '2', '4', '4', '1', '5', 'Impreza/ domówka, Spotkanie z przyjaciółmi, Randka, Piknik na łonie natury', '2', '2', '0', '0', '0', '0', '3.00', '8.00', '10.00', '2.00'], ['1', '24', '14', '2', '0', '1', '3', '2', '2', '2', '4', '2', '3', '3', '3', '2', '2', 'Grill, Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '2', '1', '1', '0', null, '4.00', '5.00', '6.00', '2.00'], ['1', '25', '10', '0', '0', '1', '3', '4', '5', '5', '4', '4', '5', '3', '2', '1', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Randka, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '3', '2', '1', '1', '0', null, '3.99', '9.99', '15.99', '1.99'], ['1', '24', '9', '0', '1', '1', '3', '3', '3', '4', '1', '2', '3', '5', '4', '2', '2', 'Wydarzenie kulturalne, Podwieczorek/ deser w domowym zaciszu', '1', '1', '1', '15', '1', '18', '4.00', '5.00', '10.00', '2.00'], ['1', '19', '3', '0', '0', '0', '5', '2', '4', '4', '3', '5', '4', '4', '3', '3', '3', 'Impreza/ domówka, Przekąska w pracy/ szkole, Grill, Spotkanie z przyjaciółmi, Podwieczorek/ deser w domowym zaciszu, Piknik na łonie natury', '4', '2', '1', '12', '1', '12', '2.00', '4.00', '8.00', '1.00'], ['0', '34', '7', '1', '0', '1', '2', '4', '2', '3', '2', '1', '2', '2', '3', '1', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '1.00', '5.00', '9.00', '0.00'], ['0', '64', '6', '1', '1', '1', '3', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', 'Żadne z powyższych', '0', '0', '0', null, '0', null, '2.00', '5.00', '8.00', '1.00']];

/**
 * Contains the initial state for the application. Is it a good idea? Perhaps not
 * but it's here for now.
 */
const initialState = {
  loading: false,
  error: null,
  itemNames: fakeData[0],
  data: fakeData.slice(1)
};

const dataLoading = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILE_LOADING_START:
      return {...state, loading: true};
    case actions.ITEM_NAMES_LOADED:
      return {...state, itemNames: action.itemNames};
    case actions.DATA_LOADED:
      return {...state, data: action.data};
    case actions.FILE_LOADING_END:
      return {...state, loading: false};
    case actions.FILE_LOADING_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export default dataLoading;
