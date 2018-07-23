from holder import *
from time_help import *


def main():

    # Create channel.
    general = Channel(name='General')
    test_channel = Channel(name='Test Channel')

    # Create messages.
    message_1 = Message(user='Philip', content_time='07-21-18', content='This is my first test message -phil')
    message_2 = Message(user='Natasha', content_time='7-22-18', content='I got your first message -tash')
    message_3 = Message(user='Oliver', content_time='7-23-18', content='Hi guys -oliver')
    message_4 = Message(user='Frankie', content_time='7-24-18', content='ruff -frankie')
    message_5 = Message(user='Peppa', content_time='7-25-18', content='bark -peppa')
    message_6 = Message(user='Charlie', content_time='7-26-18', content='meow -charlie')
    message_7 = Message(user='Philip', content_time='07-21-18', content='This is my first test message -phil')
    message_8 = Message(user='Natasha', content_time='7-22-18', content='I got your first message -tash')
    message_9 = Message(user='Oliver', content_time='7-23-18', content='Hi guys -oliver')
    message_10 = Message(user='Frankie', content_time='7-24-18', content='ruff -frankie')
    message_11 = Message(user='Peppa', content_time='7-25-18', content='bark -peppa')

    message_1 = Message(user='1', content_time='07-21-18', content='This is my first test message -phil')
    message_2 = Message(user='2', content_time='7-22-18', content='I got your first message -tash')
    message_3 = Message(user='3', content_time='7-23-18', content='Hi guys -oliver')
    message_4 = Message(user='4', content_time='7-24-18', content='ruff -frankie')
    message_5 = Message(user='5', content_time='7-25-18', content='bark -peppa')
    message_6 = Message(user='6', content_time='7-26-18', content='meow -charlie')
    message_7 = Message(user='7', content_time='7-26-18', content='meow -charlie')

    # Add messages.
    general.add(message_1)
    general.add(message_2)
    general.add(message_3)
    general.add(message_4)
    general.add(message_5)
    general.add(message_6)
    general.add(message_7)
    general.add(message_8)
    general.add(message_9)
    general.add(message_10)
    general.add(message_11)

    test_channel.add(message_1)
    test_channel.add(message_2)
    test_channel.add(message_3)
    test_channel.add(message_4)
    test_channel.add(message_5)
    test_channel.add(message_6)
    test_channel.add(message_7)


    print("following is from string")
    page_name = 'General'


    print("--------------------------------------------------------------------")


    print()
    print()
    print()
    print()
    print()

    print("following is message_dict-->")

    data = general.get_message_data()
    for i in data:
        print(i)
        print(i['user'])
        print(i['content_time'])
        print(i['content'])

    data2 = test_channel.get_message_data()
    for i in data2:
        print(i)

    print()
    print("--------------------------------------------------------------------")
    #print(utc_date())
    print("--------------------------------------------------------------------")
    #print(utc_hour())
    print()
    time_now = current_time()
    eastern = eastern_time(time_now)
    print(eastern)


if __name__ == '__main__':
    main()
